import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Autor } from '../interfaces/autor';
import { AutorDTO } from '../interfaces/autorDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  // Inyeccion del cliente http para realizar las peticiones
  constructor(private client: HttpClient) { }

  // Crear autor
  private readonly authorServiceUrl = `${environment.proyectoUrl}api/autor/registroAutor`;
  createAuthor(autor: Autor): Observable<Autor> {
    // Recuperacion del token 
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || '',
    });
    // Peticion post que envia el objeto autor y recibe el objeto autor mas su nuevo id de la bbdd
    return this.client.post<Autor>(`${this.authorServiceUrl}`, autor, { headers, withCredentials: true });
  }

  // Obtener el listado de todos los autores ordenados alfabeticamente
  private readonly authorListServiceUrl = `${environment.proyectoUrl}api/autor/listadoAutores`;
  getAuthorsByNameOrder(): Observable<Autor[]> {
    // Recuperacion del token
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || '',
    });

    return this.client.get<Autor[]>(`${this.authorListServiceUrl}`, { headers, withCredentials: true });
  }

  // Actualizar autor
  private readonly updateAuthorServiceUrl = `${environment.proyectoUrl}api/autor`
  updateAuthor(id: number, autor: Autor): Observable<Autor> {
    // Recuperacion del token de sesion
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });
    // Peticion put, actualiza el objeto autor por su id
    return this.client.put<Autor>(`${this.updateAuthorServiceUrl}/${id}`, autor, { headers, withCredentials: true });
  }

  // Obtener el autor mediante el id
  private readonly findAuthorServiceUrl = `${environment.proyectoUrl}api/autor`;
  getAuthorById(id: number): Observable<Autor> {
    // Recuperacion del token
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });

    return this.client.get<Autor>(`${this.findAuthorServiceUrl}/${id}`, { headers, withCredentials: true });
  }

  // Obtener el listado de todos los autores por orden alfabetico y con su numero de libros asociados
  private readonly numberBooksAuthorListServiceUrl = `${environment.proyectoUrl}api/autor/conteoLibros`;
  getListBookAuthorNumber(): Observable<AutorDTO[]> {
    // Recuperacion del token
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });

    return this.client.get<AutorDTO[]>(`${this.numberBooksAuthorListServiceUrl}`, { headers, withCredentials: true });
  }

  // Eliminar autor
  private readonly authorServiceDeleteUrl = `${environment.proyectoUrl}api/autor`;
  deleteAuthor(id: number): Observable<any> {
    // Recuperacion del token
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });
    // Peticion delete con id del autor para eliminar el registro
    return this.client.delete<any>(`${this.authorServiceDeleteUrl}/${id}`, { headers, withCredentials: true });
  }

}