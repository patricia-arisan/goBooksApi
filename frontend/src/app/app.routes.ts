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
        path: 'results/genre/:id',
        loadComponent: () =>
            import('./pages/results/results-genre/results-genre.component').then(
                (m) => m.ResultsGenreComponent

            ),
        title: 'Results Genre'
    },
    {
        path: 'results/score',
        loadComponent: () =>
            import('./pages/results/results-score/results-score.component').then(
                (m) => m.ResultsScoreComponent

            ),
        title: 'Results Score'
    },
    {
        path: 'results/lastBooks',
        loadComponent: () =>
            import('./pages/results/results-last/results-last.component').then(
                (m) => m.ResultsLastComponent

            ),
        title: 'Last Books'
    },
    {
        path: 'results/search/:busqueda',
        
        loadComponent: () =>
            import('./pages/results/results-search/results-search.component').then(
                (m) => m.ResultsSearchComponent

            ),
        title: 'Results Search'
    },
    // {
    //     path: 'results/search',
    //     loadComponent: () =>
    //         import('./pages/results/results-search/results-search.component').then(
    //             (m) => m.ResultsSearchComponent

    //         ),
    //     title: 'Results Search'
    // },
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
        path: 'profile/cambiar-password',
        loadComponent: () =>
            import('./pages/profile/profile-password/profile-password.component').then(
                (m) => m.ProfilePasswordComponent

            ),
        title: 'Cambiar contraseña'
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
    },
    {
    path: 'book-section/editar/:libro.id',
        loadComponent: () =>
            import('./pages/admin/admin-books/update-book/update-book.component').then(
                (m) => m.UpdateBookComponent

            ),
        title: 'Editar Libro'
    }
];
