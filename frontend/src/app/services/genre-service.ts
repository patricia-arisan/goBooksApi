import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Genero } from '../interfaces/genero';
import { GeneroDTO } from '../interfaces/generoDTO';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  // Inyeccion del cliente http para realizar las peticiones
  constructor(private client: HttpClient) { }

  // Crear genero
  private readonly genreServiceUrl = `${environment.proyectoUrl}api/genero/registroGenero`;
  createGenre(genero: Genero): Observable<Genero> {
    // Recuperacion del token de sesion
    const credentials = localStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || '',
    });
    // Peticion post para enviar el objeto genero, y recibe el objeto genero y su id de la bbdd
    return this.client.post<Genero>(`${this.genreServiceUrl}`, genero, { headers, withCredentials: true })
  }

  // Obtener el listado de todos los generos ordenados alfabeticamente
  private readonly genreListServiceUrl = `${environment.proyectoUrl}api/genero/listadoGeneros`;
  getGenresByNameOrder(): Observable<Genero[]> {
    // Recuperacion del token
    const credentials = localStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });

    return this.client.get<Genero[]>(`${this.genreListServiceUrl}`, { headers, withCredentials: true })
  }

  // Actualizar genero
  private readonly updateGenreServiceUrl = `${environment.proyectoUrl}api/genero`
  updateGenre(id: number, genero: Genero): Observable<Genero> {
    // Recuperacion del token
    const credentials = localStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });
    // Peticion put, actualiza el objeto genero por su id
    return this.client.put<Genero>(`${this.updateGenreServiceUrl}/${id}`, genero, { headers, withCredentials: true })
  }

  // Obtener el genero mediante el id
  private readonly findGenreServiceUrl = `${environment.proyectoUrl}api/genero`;
  getGenreById(id: number): Observable<Genero> {
    // Recuperacion del token
    const credentials = localStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });

    return this.client.get<Genero>(`${this.findGenreServiceUrl}/${id}`, { headers, withCredentials: true })
  }

  // Obtener el listado de los generos por orden alfabetico, con su numero de libros asociados
  private readonly numberBooksGenreListServiceUrl = `${environment.proyectoUrl}api/genero/conteoLibros`;
  getListBookGenreNumber(): Observable<GeneroDTO[]> {
    // Recuperacion del token
    const credentials = localStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });

    return this.client.get<GeneroDTO[]>(`${this.numberBooksGenreListServiceUrl}`, { headers, withCredentials: true })
  }

  // Eliminar genero
  private readonly genreServiceDeleteUrl = `${environment.proyectoUrl}api/genero`;
  deleteGenre(id: number): Observable<any> {
    // Recuperacion del token
    const credentials = localStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });
    // Peticion delete con id del genero para eliminar el registro
    return this.client.delete<any>(`${this.genreServiceDeleteUrl}/${id}`, { headers, withCredentials: true });
  }

}