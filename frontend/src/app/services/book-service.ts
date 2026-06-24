import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Libro } from '../interfaces/libro';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  // Inyeccion del cliente http para realizar las peticiones
  constructor(private client: HttpClient) { }

  // Crear libro
  private readonly bookServiceUrl = `${environment.proyectoUrl}api/libro/registroLibro`;
  createBook(libro: Libro): Observable<Libro> {
    // Recuperacion del token
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || '',
    });
    // Peticion post que envia el objeto libro y recibe el objeto libro mas su nuevo id de la bbdd
    return this.client.post<Libro>(`${this.bookServiceUrl}`, libro, { headers, withCredentials: true });
  }

  // Obtener el listado de libros por orden alfabetico
  private readonly bookListServiceUrl = `${environment.proyectoUrl}api/libro/listadoLibros`;
  getBooksByNameOrder(): Observable<Libro[]> {
    // Recuperacion del token
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });

    return this.client.get<Libro[]>(`${this.bookListServiceUrl}`, { headers, withCredentials: true });
  }

  // Obtener el libro mediante su id
  private readonly bookSectionServiceUrl = `${environment.proyectoUrl}api/libro`;
  getBookById(id: number): Observable<Libro> {
    // Recuperacion del token
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });

    return this.client.get<Libro>(`${this.bookSectionServiceUrl}/${id}`, { headers, withCredentials: true });
  }

  // Obtener los libros que hay dentro de un genero por el id de este
  private readonly bookByGenderServiceUrl = `${environment.proyectoUrl}api/libro/categoria`;
  getBookByGenreId(id: number): Observable<Libro[]> {
    // Recuperacion del token
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });

    return this.client.get<Libro[]>(`${this.bookByGenderServiceUrl}/${id}`, { headers, withCredentials: true });
  }

  // Obtener los libros que pertenecen a un mismo autor, por el id de este
  private readonly bookByAuthorServiceUrl = `${environment.proyectoUrl}api/libro/autor`;
  getBookByAuthorId(id: number): Observable<Libro[]> {
    // Recuperacion del token
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });

    return this.client.get<Libro[]>(`${this.bookByAuthorServiceUrl}/${id}`, { headers, withCredentials: true });
  }

  // Obtener los libros que pertenecen a una misma editorial, por el id de este
  private readonly bookByPublisherServiceUrl = `${environment.proyectoUrl}api/libro/editorial`;
  getBookByPublisherId(id: number): Observable<Libro[]> {
    // Recuperacion del token
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });

    return this.client.get<Libro[]>(`${this.bookByPublisherServiceUrl}/${id}`, { headers, withCredentials: true });
  }

  // Obtener los ultimos cuatro libros agragados a la bbdd
  private readonly lastBooksListServiceUrl = `${environment.proyectoUrl}api/libro/ultimosLibros`;
  getLastBooks(): Observable<Libro[]> {
    // Recuperacion del token
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });

    return this.client.get<Libro[]>(`${this.lastBooksListServiceUrl}`, { headers, withCredentials: true });
  }

  // Obtener el listado completo de los ultimos libros agregados
  private readonly allLastBooksListServiceUrl = `${environment.proyectoUrl}api/libro/listaUltimosLibros`;
  getAllLastBooks(): Observable<Libro[]> {
    // Recuperacion del token
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });

    return this.client.get<Libro[]>(`${this.allLastBooksListServiceUrl}`, { headers, withCredentials: true });
  }

  // Obtener el listado completo de los libros puntuados, de mayor a menor puntuacion media
  private readonly scoreBooksListServiceUrl = `${environment.proyectoUrl}api/libro/puntuacionLibros`;
  getListBookScore(): Observable<Libro[]> {
    // Recuperacion del token
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });

    return this.client.get<Libro[]>(`${this.scoreBooksListServiceUrl}`, { headers, withCredentials: true });
  }

  // Obtener el listado de los cuatro libros mejor puntuados, de mayor a menor puntuacion media
  private readonly bestScoreBooksServiceUrl = `${environment.proyectoUrl}api/libro/mejorPuntuacionLibros`;
  getBooksBestScore(): Observable<Libro[]> {
    // Recuperacion del token
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });

    return this.client.get<Libro[]>(`${this.bestScoreBooksServiceUrl}`, { headers, withCredentials: true });
  }
  
  // Obtener el resultado de busqueda de libros por titulo, autor, editorial o isbn
  private readonly searchServiceUrl = `${environment.proyectoUrl}api/libro/resultadosBusqueda`;
  searchByBookAuthorEditorial(searchedWord: string): Observable<Libro[]> {
    // Recuperacion del token
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });
    // Peticion get que manda un parametro con la busqueda para obtener un listado de libros
    return this.client.get<Libro[]>(`${this.searchServiceUrl}?clave=${searchedWord}`, { headers, withCredentials: true });
  }

  // Actualizar libro
  private readonly updateBookServiceUrl = `${environment.proyectoUrl}api/libro`
  updateBook(id: number, libro: Libro): Observable<Libro> {
    // Recuperacion del token
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });
    // Peticion put, actualiza el objeto libro por su id
    return this.client.put<Libro>(`${this.updateBookServiceUrl}/${id}`, libro, { headers, withCredentials: true });
  }

  // Eliminar libro mediante su id
  private readonly bookServiceDeleteUrl = `${environment.proyectoUrl}api/libro`;
  deleteBook(id: number): Observable<any> {
    // Recuperacion del token
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });

    return this.client.delete<any>(`${this.bookServiceDeleteUrl}/${id}`, { headers, withCredentials: true });
  }

}