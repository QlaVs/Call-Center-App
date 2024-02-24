import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AudioRecordingService } from '../utils/record-audio';
import { DomSanitizer } from '@angular/platform-browser';
import { NgIf } from '@angular/common';
import { Cookie } from '../utils/cookies';

@Component({
  selector: 'call',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './call.component.html',
  styleUrl: './call.component.css'
})

export class CallComponent implements OnDestroy{
  title = 'Call Page';

  isRecording = false;
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
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }

  save(): void {
    let audioData: Array<{login: string, tracks: string[]}> = JSON.parse(localStorage.getItem('audioTracks') as string) || [];
    const url: string = window.URL.createObjectURL(this.audioTrack.blob);
    const cookie: Cookie = new Cookie;
    const login: string = cookie.getCookie('login');
    let currentUserTracks: Array<{login: string, tracks: string[]}> = audioData.filter(x => x.login === login);
    if (currentUserTracks.length > 0) {

      audioData[audioData.findIndex(x => x.login === login)].tracks.push(url);
    } else {
      audioData.push({login: login, tracks: [url]});
    }
    localStorage.setItem('audioTracks', JSON.stringify(audioData));
  }
}
