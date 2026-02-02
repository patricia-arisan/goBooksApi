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


  constructor(private client: HttpClient) { }

  private readonly genreServiceUrl = `${environment.proyectoUrl}api/genero/registroGenero`;

  createGenre(genero: Genero): Observable<Genero> {
    const credentials = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

      'Authorization': credentials || '',

      //withCredentials: true ??????
      //'Cookie: SESSION=ZTIyZWI1ZmItMWI1ZS00M2Q4LTg5MGMtMWQyMjkyNTJiMzJj'


    })

    return this.client.post<Genero>(`${this.genreServiceUrl}`, genero, { headers,withCredentials:true})
  }

  private readonly genreListServiceUrl = `${environment.proyectoUrl}api/genero/listadoGeneros`;

  getGenresByNameOrder(): Observable<Genero[]> {
    const credentials = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

      'Authorization': credentials || ''

    })

    return this.client.get<Genero[]>(`${this.genreListServiceUrl}`, { headers,withCredentials:true})
  }

  private readonly updateGenreServiceUrl = `${environment.proyectoUrl}api/genero`
  updateGenre(id: number, genero: Genero): Observable<Genero> {

    const credentials = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

      'Authorization': credentials || ''

    })

    return this.client.put<Genero>(`${this.updateGenreServiceUrl}/${id}`, genero, { headers,withCredentials:true})
  }

  private readonly findGenreServiceUrl = `${environment.proyectoUrl}api/genero`;

  getGenreById(id: number): Observable<Genero> {
    const credentials = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

      'Authorization': credentials || ''

    })

    return this.client.get<Genero>(`${this.findGenreServiceUrl}/${id}`, { headers,withCredentials:true})
  }

  private readonly numberBooksGenreListServiceUrl = `${environment.proyectoUrl}api/genero/conteoLibros`;
  getListBookGenreNumber(): Observable<GeneroDTO[]> {
    const credentials = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

      'Authorization': credentials || ''

    })

    return this.client.get<GeneroDTO[]>(`${this.numberBooksGenreListServiceUrl}`, { headers,withCredentials:true})
  }

  private readonly genreServiceDeleteUrl = `${environment.proyectoUrl}api/genero`;
  deleteGenre(id: number): Observable<any> {
    console.log("Service " + id);
    const credentials = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

      'Authorization': credentials || ''

    })


    return this.client.delete<any>(`${this.genreServiceDeleteUrl}/${id}`, { headers,withCredentials:true})


  }

}
