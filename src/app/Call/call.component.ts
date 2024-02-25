import { Component, OnDestroy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AudioRecordingService } from '../utils/record-audio';
import { DomSanitizer } from '@angular/platform-browser';
import { NgIf } from '@angular/common';
import { Cookie } from '../utils/cookies';
import { tracks } from '../utils/types';

@Component({
  selector: 'call',
  standalone: true,
  imports: [RouterOutlet, NgIf, RouterLink],
  templateUrl: './call.component.html',
  styleUrl: './call.component.css'
})

export class CallComponent implements OnDestroy{
  title = 'Call Page';

  isRecording = false;
  saveable = false;
  recordStartTime: number = 0;
  recordEndTime: number = 0;
  recordedTime: any;
  blobUrl: any;
  audioTrack: any;

  constructor(
    private audioRecordingService: AudioRecordingService,
    private sanitizer: DomSanitizer
  ) {
    this.audioRecordingService
      .recordingFailed()
      .subscribe(() => (this.isRecording = false));
    this.audioRecordingService
      .getRecordedTime()
      .subscribe(time => (this.recordedTime = time));
    this.audioRecordingService.getRecordedBlob().subscribe(data => {
      this.audioTrack = data;
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(data.blob)
      );
    });
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.recordStartTime = Date.now();
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.recordStartTime = 0;
      this.recordEndTime = 0;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.recordEndTime = Date.now();
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
      this.saveable = true;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }

  save(): void {
    const startTime = this.recordStartTime;
    const endTime = this.recordEndTime;
    const duration = this.recordedTime;
    let audioData: tracks = JSON.parse(localStorage.getItem('audioTracks') as string) || [];
    let reader = new FileReader();
    reader.readAsDataURL(this.audioTrack.blob); 
    reader.onloadend = function() {
      let b64Audio: any = reader.result
      const cookie: Cookie = new Cookie;
      const login: string = cookie.getCookie('login');
      let currentUserTracks: tracks = audioData.filter(x => x.login === login);
      if (currentUserTracks.length > 0) {
  
        audioData[audioData.findIndex(x => x.login === login)].tracks.push(
          {
            trackId: currentUserTracks.length + 1,
            startTime: startTime,
            endTime: endTime,
            duration: duration,
            track: b64Audio
          }
        );
      } else {
        audioData.push({login: login, tracks: [{
          trackId: currentUserTracks.length + 1,
          startTime: startTime,
          endTime: endTime,
          duration: duration,
          track: b64Audio
        }]});
      }
      localStorage.setItem('audioTracks', JSON.stringify(audioData));
      alert('Record saved!');
    }
    this.saveable = false;
  }
}
