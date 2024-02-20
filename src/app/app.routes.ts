import { Routes } from '@angular/router';
import { JournalComponent } from './Journal/journal.component';
import { LoginComponent } from './Login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'journal', component: JournalComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];
