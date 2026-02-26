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
  // Inyeccion del cliente http para realizar las peticiones
  constructor(private client: HttpClient) { }
  // Crear editorial
  private readonly publisherServiceUrl = `${environment.proyectoUrl}api/editorial/registroEditorial`;
  createPublisher(editorial: Editorial): Observable<Editorial> {
    // Recuperacion del token de sesion
    const credentials = localStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || '',
    });
    // Peticion post para enviar los datos de la editorial y recibir el objeto editorial con el id de la bbdd
    return this.client.post<Editorial>(`${this.publisherServiceUrl}`, editorial, { headers, withCredentials: true });
  }
  
  // Obtener el listado de todas las editoriales por orden alfabetico
  private readonly publisherListServiceUrl = `${environment.proyectoUrl}api/editorial/listadoEditoriales`;
  getPublishersByNameOrder(): Observable<Editorial[]> {
    // Recuperacion del token
    const credentials = localStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });

    return this.client.get<Editorial[]>(`${this.publisherListServiceUrl}`, { headers, withCredentials: true });
  }

  // Actualizar la editorial
  private readonly updatePublisherServiceUrl = `${environment.proyectoUrl}api/editorial`
  updatePublisher(id: number, editorial: Editorial): Observable<Editorial> {
    // Recuperacion del token
    const credentials = localStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });
    // Peticion put, actualiza el objeto editorial por su id
    return this.client.put<Editorial>(`${this.updatePublisherServiceUrl}/${id}`, editorial, { headers, withCredentials: true });
  }

  // Recuperar la editorial mediante el id
  private readonly findPublisherServiceUrl = `${environment.proyectoUrl}api/editorial`;
  getPublisherById(id: number): Observable<Editorial> {
    // Recuperacion del token
    const credentials = localStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });

    return this.client.get<Editorial>(`${this.findPublisherServiceUrl}/${id}`, { headers, withCredentials: true });
  }

  // Obtener el listado de todas las editoriales por orden alfabetico y con su numero de libros asociados
  private readonly numberBooksPublisherListServiceUrl = `${environment.proyectoUrl}api/editorial/conteoLibros`;
  getListBookPublisherNumber(): Observable<EditorialDTO[]> {
    // Recuperacion del token
    const credentials = localStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });

    return this.client.get<EditorialDTO[]>(`${this.numberBooksPublisherListServiceUrl}`, { headers, withCredentials: true });
  }

  // Eliminar la editorial
  private readonly deletePublisherServiceUrl = `${environment.proyectoUrl}api/editorial`;
  deletePublisher(id: number): Observable<any> {
    // Recuperacion del token
    const credentials = localStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });
    // Peticion delete con id de la editorial para eliminar el registro
    return this.client.delete<any>(`${this.deletePublisherServiceUrl}/${id}`, { headers, withCredentials: true });
  }

}