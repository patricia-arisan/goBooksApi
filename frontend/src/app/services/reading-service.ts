import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {Observable} from 'rxjs';
import { Autor } from '../interfaces/autor';
import { LecturaDTO } from '../interfaces/lecturaDTO';

@Injectable({
  providedIn: 'root'
})
export class ReadingService {
  

constructor(private client: HttpClient) { }
  
  private readonly readingServiceUrl = `${environment.proyectoUrl}api/lectura/registroLectura`;
  
    saveReading(lectura: LecturaDTO): Observable<LecturaDTO>{
      const credentials = localStorage.getItem('token');
    const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            
            'Authorization' : credentials || '',
        
        })
        
      return this.client.post<LecturaDTO>(`${this.readingServiceUrl}`,lectura,{headers})
    }

    
 
}
