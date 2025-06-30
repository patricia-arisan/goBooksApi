import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {Observable} from 'rxjs';
import { Libro } from '../interfaces/libro';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  

constructor(private client: HttpClient) { }
  
  private readonly bookServiceUrl = `${environment.proyectoUrl}api/libro/registroLibro`;
  
    createBook(libro: Libro): Observable<Libro>{
      const credentials = localStorage.getItem('token');
      const headers = new HttpHeaders(libro?{
            'Content-Type': 'application/json',
            
            'Authorization' : credentials || '',

                       
        }:{})
      return this.client.post<Libro>(`${this.bookServiceUrl}`,libro,{headers})
    }
 
}
