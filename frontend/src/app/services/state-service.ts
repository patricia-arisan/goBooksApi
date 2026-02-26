import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Estado } from '../interfaces/estado';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // Inyeccion del cliente http para realizar las peticiones
  constructor(private client: HttpClient) { }

  // Obtener el listado de todos los estados de las lecturas
  private readonly stateServiceUrl = `${environment.proyectoUrl}api/estado/listadoEstados`;
  getStatesList(): Observable<Estado[]> {
    // Recuperacion del token de sesion
    const credentials = localStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });

    return this.client.get<Estado[]>(`${this.stateServiceUrl}`, { headers, withCredentials: true });
  }

}