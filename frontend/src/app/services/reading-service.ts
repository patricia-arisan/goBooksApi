import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { LecturaDTO } from '../interfaces/lecturaDTO';
import { Lectura } from '../interfaces/lectura';

@Injectable({
  providedIn: 'root'
})
export class ReadingService {
  // Inyeccion del cliente http para realizar las peticiones
  constructor(private client: HttpClient) { }

  // Guardar lectura
  private readonly readingServiceUrl = `${environment.proyectoUrl}api/lectura/registroLectura`;
  saveReading(lectura: LecturaDTO): Observable<LecturaDTO> {
    // Recuperacion del token
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || '',
    });
    // Peticion post para guardar el objeto lectura
    return this.client.post<LecturaDTO>(`${this.readingServiceUrl}`, lectura, { headers, withCredentials: true });
  }

  // Obtener la lista de los libros marcados como lectura por el usuario
  private readonly readingUserServiceUrl = `${environment.proyectoUrl}api/lectura/listadoLecturas`;
  getReadingsByUser(id: number): Observable<Lectura[]> {
    // Recuperacion del token
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });

    return this.client.get<Lectura[]>(`${this.readingUserServiceUrl}/${id}`, { headers, withCredentials: true });

  }

  // Obtener el listado de lecturas del usuario en funcion del id del estado en el que se encuentran
  private readonly readingUserStateServiceUrl = `${environment.proyectoUrl}api/lectura/listadoLecturasEstado`;
  getReadingsByUserState(idUsuario: number, idEstado: number): Observable<Lectura[]> {
    // Recuperacion del token de sesion
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });
    // Configuracion del parametro de consulta
    let params = new HttpParams().set('idEstado', idEstado);

    return this.client.get<Lectura[]>(`${this.readingUserStateServiceUrl}/${idUsuario}`, { headers, params: params, withCredentials: true });
  }

  // Obtener la media de la puntuacion de las lecturas de un libro
  private readonly readingAverageServiceUrl = `${environment.proyectoUrl}api/lectura/mediaPuntuacionLibro`;
  getAverageReading(idLibro: number): Observable<number> {
    // Recuperacion del token
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });

    return this.client.get<number>(`${this.readingAverageServiceUrl}/${idLibro}`, { headers, withCredentials: true });
  }

  // Actualizar el estado de la lectura de un libro
  private readonly readingUpdateServiceUrl = `${environment.proyectoUrl}api/lectura`;
  updateReading(id: number, lectura: Lectura): Observable<Lectura> {
    // Recuperacion del token
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });
    // Peticion put para actualizar el objeto Lectura en funcion de su id
    return this.client.put<Lectura>(`${this.readingUpdateServiceUrl}/${id}`, lectura, { headers, withCredentials: true })
  }

  // Obtener la lectura por usuario e id
  private readonly readingBookServiceUrl = `${environment.proyectoUrl}api/lectura`;
  getReadingBook(idUsuario: number, idLibro: number): Observable<Lectura> {
    // Recuperacion del token
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });
    // Configuracion del parametro de consulta
    let params = new HttpParams().set('idLibro', idLibro);

    return this.client.get<Lectura>(`${this.readingBookServiceUrl}/${idUsuario}`, { headers, params: params, withCredentials: true });
  }

  // Eliminar lectura
  private readonly readingServiceDeleteUrl = `${environment.proyectoUrl}api/lectura`;
  deleteReading(id: number): Observable<any> {
    // Recuperacion del token
    const credentials = sessionStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });
    // Peticion delete con id de la lectura para eliminar el registro
    return this.client.delete<any>(`${this.readingServiceDeleteUrl}/${id}`, { headers, withCredentials: true });
  }

}