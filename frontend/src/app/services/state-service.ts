import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {Observable} from 'rxjs';
import { Estado } from '../interfaces/estado';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  

constructor(private client: HttpClient) { }
  
private readonly stateServiceUrl = `${environment.proyectoUrl}api/estado/listadoEstados`;

getStatesList(): Observable<Estado[]>{
        const credentials = localStorage.getItem('token');
        const headers = new HttpHeaders({
              'Content-Type': 'application/json',
                
              'Authorization' : credentials || ''
               
          })
    
          return this.client.get<Estado[]>(`${this.stateServiceUrl}`,{headers})
      }    
 
}
