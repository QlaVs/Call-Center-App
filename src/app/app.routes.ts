import { Routes } from '@angular/router';
import { Guard } from './utils/guard';
import { LoginComponent } from './Login/login.component';
import { RegisterComponent } from './Register/register.component';
import { CallComponent } from './Call/call.component';
import { JournalComponent } from './Journal/journal.component';

export const routes: Routes = [
    { 
        path: 'register',
        component: RegisterComponent,
        data: {title: 'Registration'},
        canActivate: [Guard.isLogged]
    },
    { 
        path: 'login',
        component: LoginComponent,
        data: {title: 'Login'},
        canActivate: [Guard.isLogged]
    },
    {
        path: 'call',
        component: CallComponent,
        data: {title: 'Call'},
        canActivate: [Guard.isLogged]
    },
    {
        path: 'journal',
        component: JournalComponent,
        data: {title: 'Journal'},
        canActivate: [Guard.isLogged]
    },

    // otherwise redirect to home
    { 
        path: '',
        pathMatch: 'full',
        redirectTo: 'login' 
    }
];