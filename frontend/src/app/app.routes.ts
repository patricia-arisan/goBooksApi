import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';


export const routes: Routes = [
    {
        path: '',   
        redirectTo: 'login', 
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'registration',
        loadComponent: () =>
            import('./pages/registration/registration.component').then(
                (m) => m.RegistrationComponent

            ),
        title: 'Registro'
    },
    {
        path: 'home',
        loadComponent: () =>
            import('./pages/home/home.component').then(
                (m) => m.HomeComponent

            ),
        title: 'Home'
    }
];
