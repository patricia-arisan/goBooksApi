import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { inject } from '@angular/core';
import { BookService } from './services/book-service';
import { map, Observable } from 'rxjs';
import { Libro } from './interfaces/libro';
import { Genero } from './interfaces/genero';
import { GenreService } from './services/genre-service';
import { AuthorService } from './services/author-service';
import { Autor } from './interfaces/autor';
import { PublisherService } from './services/publisher-service';
import { Editorial } from './interfaces/editorial';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { userGuard } from './core/guards/user.guard';




const titleResolver: ResolveFn<string> = (
  route: ActivatedRouteSnapshot,
): Observable<string> | string => {
  const bookId = route.paramMap.get('libro.id');
  // Si es nulo devuelve vacio para evitar error
  if (!bookId) {
    return ''; 
  }
  return inject(BookService).getBookById(parseInt(bookId)).pipe(
    map((libro:Libro)=>{
        return libro.nombre || '';
        })
    );
};

const titleGenreResolver: ResolveFn<string> = (
  route: ActivatedRouteSnapshot,
): Observable<string> | string => {
  const genreId = route.paramMap.get('id');
  const titleSection = 'Resultados';
  if (!genreId) {
    return titleSection; 
  }
  return inject(GenreService).getGenreById(parseInt(genreId)).pipe(
    map((genero:Genero)=>{
        const genreName = genero.nombre || '';
        return `${titleSection} - ${genreName}`;
        })
    );
};

const titleAuthorResolver: ResolveFn<string> = (
  route: ActivatedRouteSnapshot,
): Observable<string> | string => {
  const authorId = route.paramMap.get('id');
  const titleSection = 'Resultados';
  if (!authorId) {
    return titleSection; 
  }
  return inject(AuthorService).getAuthorById(parseInt(authorId)).pipe(
    map((autor:Autor)=>{
        const authorName = autor.nombre || '';
        return `${titleSection} - ${authorName}`;
        })
    );
};

const titlePublisherResolver: ResolveFn<string> = (
  route: ActivatedRouteSnapshot,
): Observable<string> | string => {
  const publisherId = route.paramMap.get('id');
  const titleSection = 'Resultados';
  if (!publisherId) {
    return titleSection; 
  }
  return inject(PublisherService).getPublisherById(parseInt(publisherId)).pipe(
    map((editorial:Editorial)=>{
        const publisherName = editorial.nombre || '';
        return `${titleSection} - ${publisherName}`;
        })
    );
};

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
        title: 'Home',
        canActivate: [authGuard,userGuard]
    },
    {
        path: 'results/genre/:id',
        loadComponent: () =>
            import('./pages/results/results-genre/results-genre.component').then(
                (m) => m.ResultsGenreComponent

            ),
        title: titleGenreResolver,
        canActivate: [authGuard]
    },
    {
        path: 'results/author/:id',
        loadComponent: () =>
            import('./pages/results/results-author/results-author.component').then(
                (m) => m.ResultsAuthorComponent

            ),
        title: titleAuthorResolver,
        canActivate: [authGuard]
    },
    {
        path: 'results/publisher/:id',
        loadComponent: () =>
            import('./pages/results/results-publisher/results-publisher.component').then(
                (m) => m.ResultsPublisherComponent

            ),
        title: titlePublisherResolver,
        canActivate: [authGuard]
    },
    {
        path: 'results/score',
        loadComponent: () =>
            import('./pages/results/results-score/results-score.component').then(
                (m) => m.ResultsScoreComponent

            ),
        title: 'Mejor valorados',
        canActivate: [authGuard,userGuard]
    },
    {
        path: 'results/lastBooks',
        loadComponent: () =>
            import('./pages/results/results-last/results-last.component').then(
                (m) => m.ResultsLastComponent

            ),
        title: 'Últimos libros',
        canActivate: [authGuard,userGuard]
    },
    {
        path: 'results/search/:searchedWord',
        
        loadComponent: () =>
            import('./pages/results/results-search/results-search.component').then(
                (m) => m.ResultsSearchComponent

            ),
        title: 'Resultados - Libros',
        canActivate: [authGuard]
    },
    
    {
        path: 'books',
        loadComponent: () =>
            import('./pages/books/books.component').then(
                (m) => m.BooksComponent

            ),
        title: 'Libros',
        canActivate: [authGuard,userGuard]
    },
    {
        path: 'admin-books/book-section/:libro.id',
        loadComponent: () =>
            import('./pages/books/book-section/book-section.component').then(
                (m) => m.BookSectionComponent

            ),
        title: titleResolver,
        canActivate: [authGuard,adminGuard]
    },
    {
        path: 'books/book-section/:libro.id',
        loadComponent: () =>
            import('./pages/books/book-section/book-section.component').then(
                (m) => m.BookSectionComponent

            ),
        title: titleResolver,
        canActivate: [authGuard,userGuard]
        
    },
    {
        path: 'readings',
        loadComponent: () =>
            import('./pages/readings/readings.component').then(
                (m) => m.ReadingsComponent

            ),
        title: 'Lecturas',
        canActivate: [authGuard,userGuard]
    },
    {
        path: 'profile',
        loadComponent: () =>
            import('./pages/profile/profile.component').then(
                (m) => m.ProfileComponent

            ),
        title: 'Perfil',
        canActivate: [authGuard,userGuard]
    },
    {
        path: 'profile/cambiar-password',
        loadComponent: () =>
            import('./pages/profile/profile-password/profile-password.component').then(
                (m) => m.ProfilePasswordComponent

            ),
        title: 'Perfil - Cambiar contraseña',
        canActivate: [authGuard,userGuard]
    },
    {
    path: 'admin-books',
        loadComponent: () =>
            import('./pages/admin/admin-books/admin-books.component').then(
                (m) => m.AdminBooksComponent

            ),
        title: 'Administrar libros',
        canActivate: [authGuard,adminGuard]
    },
    {
    path: 'admin-authors',
        loadComponent: () =>
            import('./pages/admin/admin-authors/admin-authors.component').then(
                (m) => m.AdminAuthorsComponent

            ),
        title: 'Administrar autores',
        canActivate: [authGuard,adminGuard]
    },
    {
    path: 'admin-genres',
        loadComponent: () =>
            import('./pages/admin/admin-genres/admin-genres.component').then(
                (m) => m.AdminGenresComponent

            ),
        title: 'Administrar géneros',
        canActivate: [authGuard,adminGuard]
    },
    {
    path: 'admin-publishers',
        loadComponent: () =>
            import('./pages/admin/admin-publishers/admin-publishers.component').then(
                (m) => m.AdminPublishersComponent

            ),
        title: 'Administrar editoriales',
        canActivate: [authGuard,adminGuard]
    },
    {
    path: 'admin-home',
        loadComponent: () =>
            import('./pages/admin/admin-home/admin-home.component').then(
                (m) => m.AdminHomeComponent

            ),
        title: 'Home',
        canActivate: [authGuard,adminGuard]
    },
    {
    path: 'admin-books/create-book',
        loadComponent: () =>
            import('./pages/admin/admin-books/admin-books-create/admin-books-create.component').then(
                (m) => m.AdminBooksCreateComponent

            ),
        title: 'Crear libro',
        canActivate: [authGuard,adminGuard]
    },
    {
    path: 'admin-books/book-section/editar/:libro.id',
        loadComponent: () =>
            import('./pages/admin/admin-books/admin-books-update/admin-books-update.component').then(
                (m) => m.AdminBooksUpdateComponent

            ),
        title: 'Editar libro',
        canActivate: [authGuard,adminGuard]
    }
];


