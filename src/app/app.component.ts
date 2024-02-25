import { NgIf, Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, RouterLink } from '@angular/router';
import { Cookie } from './utils/cookies';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentUrl: any;

  constructor(
    public router: Router,
    public location: Location,
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = this.location.path();
      }
    });
  }

  ngOnInit() {
  }


  logout() {
    const logoutConfirmation = confirm('Are you sure you want to logout?');
    if (logoutConfirmation) {
      const cookie: Cookie = new Cookie();
      cookie.deleteCookie('userToken');
      this.router.navigate(['/login']);
    }
  }
}
