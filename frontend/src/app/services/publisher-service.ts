import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Editorial } from '../interfaces/editorial';
import { EditorialDTO } from '../interfaces/editorialDTO';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {


  constructor(private client: HttpClient) { }

  private readonly publisherServiceUrl = `${environment.proyectoUrl}api/editorial/registroEditorial`;

  createPublisher(editorial: Editorial): Observable<Editorial> {
    const credentials = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

      'Authorization': credentials || '',

      //withCredentials: true ??????
      //'Cookie: SESSION=ZTIyZWI1ZmItMWI1ZS00M2Q4LTg5MGMtMWQyMjkyNTJiMzJj'


    })

    return this.client.post<Editorial>(`${this.publisherServiceUrl}`, editorial, { headers,withCredentials:true})
  }

  private readonly publisherListServiceUrl = `${environment.proyectoUrl}api/editorial/listadoEditoriales`;

  getPublishersByNameOrder(): Observable<Editorial[]> {
    const credentials = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

      'Authorization': credentials || ''

    })

    return this.client.get<Editorial[]>(`${this.publisherListServiceUrl}`, { headers,withCredentials:true})
  }

  private readonly updatePublisherServiceUrl = `${environment.proyectoUrl}api/editorial`
  updatePublisher(id: number, editorial: Editorial): Observable<Editorial> {

    const credentials = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

      'Authorization': credentials || ''

    })

    return this.client.put<Editorial>(`${this.updatePublisherServiceUrl}/${id}`, editorial, { headers,withCredentials:true})
  }

  private readonly findPublisherServiceUrl = `${environment.proyectoUrl}api/editorial`;

  getPublisherById(id: number): Observable<Editorial> {
    const credentials = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

      'Authorization': credentials || ''

    })

    return this.client.get<Editorial>(`${this.findPublisherServiceUrl}/${id}`, { headers,withCredentials:true})
  }

  private readonly numberBooksPublisherListServiceUrl = `${environment.proyectoUrl}api/editorial/conteoLibros`;
  getListBookPublisherNumber(): Observable<EditorialDTO[]> {
    const credentials = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

      'Authorization': credentials || ''

    })

    return this.client.get<EditorialDTO[]>(`${this.numberBooksPublisherListServiceUrl}`, { headers,withCredentials:true})
  }

  private readonly deletePublisherServiceUrl = `${environment.proyectoUrl}api/editorial`;
  deletePublisher(id: number): Observable<any> {
    console.log("Service " + id);
    const credentials = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

      'Authorization': credentials || ''

    })


    return this.client.delete<any>(`${this.deletePublisherServiceUrl}/${id}`, { headers,withCredentials:true})


  }

}
