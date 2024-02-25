import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Cookie } from '../utils/cookies';
import { userTracks, tracks, track, journal } from '../utils/types';

@Component({
  selector: 'journal',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgFor],
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.css'
})

export class JournalComponent {
  cookie: Cookie = new Cookie;
 
  login: string = this.cookie.getCookie('login');
  title: string = 'Journal Page';
  journal: journal = [];
  ngOnInit() {
    let rawData: tracks | [] = JSON.parse(localStorage.getItem('audioTracks') as string) || [];

    let name: string = (JSON.parse(localStorage.getItem('users') as string) || []).filter(
      (x: any) => x.login === this.login
    )[0].fio;

    rawData.forEach((item: userTracks) => {
      item.tracks.forEach((track: track) => {
        this.journal.push({
          name: name,
          trackId: track.trackId,
          track: track.track,
          duration: track.duration,
          startTime: new Date(track.startTime).toLocaleString(),
          endTime: new Date(track.endTime).toLocaleString(),
        });
      });
    });
  }

  deleteRow(trackId: number) {
    let delteConfirm = confirm('Are you sure you want to delete this record?');
    if (delteConfirm) {
      let rawData: tracks | [] = JSON.parse(localStorage.getItem('audioTracks') as string) || [];
      rawData.forEach((item: userTracks) => {
        if (item.login === this.login) {
          item.tracks.forEach((track: track) => {
            if (track.trackId === trackId) {
              item.tracks.splice(item.tracks.indexOf(track), 1);
            }
          });
        }
      });
      localStorage.setItem('audioTracks', JSON.stringify(rawData));
      document.getElementById(`track-${trackId}`)!.remove();
    }
  }
}
