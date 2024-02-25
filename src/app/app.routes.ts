import { Routes } from '@angular/router';
import { Guard } from './utils/guard';

export const routes: Routes = [
    { 
        path: 'register',
        loadComponent: () => import('./Register/register.component').then(m => m.RegisterComponent),
        data: {title: 'Registration'},
        canActivate: [Guard.isLogged]
    },
    { 
        path: 'login',
        loadComponent: () => import('./Login/login.component').then(m => m.LoginComponent),
        data: {title: 'Login'},
        canActivate: [Guard.isLogged]
    },
    {
        path: 'call',
        loadComponent: () => import('./Call/call.component').then(m => m.CallComponent),
        data: {title: 'Call'},
        canActivate: [Guard.isLogged]
    },
    {
        path: 'journal',
        loadComponent: () => import('./Journal/journal.component').then(m => m.JournalComponent),
        data: {title: 'Journal'},
        canActivate: [Guard.isLogged]
    },

    // redirect empty path to login page
    { 
        path: '',
        pathMatch: 'full',
        redirectTo: 'login' 
    }
];