import { Routes } from '@angular/router';
import { JournalComponent } from './Journal/journal.component';
import { LoginComponent } from './Login/login.component';
import { RegisterComponent } from './Register/register.component';
import { Guard } from './utils/guard';

export const routes: Routes = [
    { 
        path: 'register',
        component: RegisterComponent,
        data: {title: 'Registration'}
    },
    { 
        path: 'login',
        component: LoginComponent,
        data: {title: 'Login'}
    },
    {
        path: 'journal',
        component: JournalComponent,
        data: {title: 'Journal'},
        canActivate: [Guard.isLogged]
    },

    // otherwise redirect to home
    { 
        path: '**',
        redirectTo: 'login' 
    }
];