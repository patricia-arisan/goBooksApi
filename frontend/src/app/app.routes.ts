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
    },
    {
        path: 'results/:id',
        loadComponent: () =>
            import('./pages/results/results.component').then(
                (m) => m.ResultsComponent

            ),
        title: 'Results'
    },
    {
        path: 'books',
        loadComponent: () =>
            import('./pages/books/books.component').then(
                (m) => m.BooksComponent

            ),
        title: 'Books'
    },
    {
        path: 'book-section/:libro.id',
        loadComponent: () =>
            import('./pages/books/book-section/book-section.component').then(
                (m) => m.BookSectionComponent

            ),
        title: 'Book Section'
    },
    {
        path: 'readings',
        loadComponent: () =>
            import('./pages/readings/readings.component').then(
                (m) => m.ReadingsComponent

            ),
        title: 'Readings'
    },
    {
        path: 'profile',
        loadComponent: () =>
            import('./pages/profile/profile.component').then(
                (m) => m.ProfileComponent

            ),
        title: 'Profile'
    },
    {
    path: 'admin-books',
        loadComponent: () =>
            import('./pages/admin/admin-books/admin-books.component').then(
                (m) => m.AdminBooksComponent

            ),
        title: 'Administrar Libros'
    },
    {
    path: 'create-book',
        loadComponent: () =>
            import('./pages/admin/admin-books/create-book/create-book.component').then(
                (m) => m.CreateBookComponent

            ),
        title: 'Crear Libro'
    }
];
