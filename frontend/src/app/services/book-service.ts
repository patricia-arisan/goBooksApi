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

    private readonly bookListServiceUrl = `${environment.proyectoUrl}api/libro/listadoLibros`;
    
      getBooksByNameOrder(): Observable<Libro[]>{
        const credentials = localStorage.getItem('token');
        const headers = new HttpHeaders({
              'Content-Type': 'application/json',
                
              'Authorization' : credentials || ''
               
          })
    
          return this.client.get<Libro[]>(`${this.bookListServiceUrl}`,{headers})
      }

      private readonly bookSectionServiceUrl = `${environment.proyectoUrl}api/libro`;
    
      getBookById(id: number): Observable<Libro>{
        const credentials = localStorage.getItem('token');
        const headers = new HttpHeaders({
              'Content-Type': 'application/json',
                
              'Authorization' : credentials || ''
               
          })
    
          return this.client.get<Libro>(`${this.bookSectionServiceUrl}/${id}`,{headers})
      }

      private readonly bookByGenderServiceUrl = `${environment.proyectoUrl}api/libro/categoria`;

      getBookByGenderId(id: number): Observable<Libro[]>{

        const credentials = localStorage.getItem('token');
        const headers = new HttpHeaders({
              'Content-Type': 'application/json',
                
              'Authorization' : credentials || ''
               
          })
    
          return this.client.get<Libro[]>(`${this.bookByGenderServiceUrl}/${id}`,{headers})

      }

      private readonly lastBooksListServiceUrl = `${environment.proyectoUrl}api/libro/ultimosLibros`;
    
      getLastBooks(): Observable<Libro[]>{
        const credentials = localStorage.getItem('token');
        const headers = new HttpHeaders({
              'Content-Type': 'application/json',
                
              'Authorization' : credentials || ''
               
          })
    
          return this.client.get<Libro[]>(`${this.lastBooksListServiceUrl}`,{headers})
      }

//////////////////////
private readonly scoreBooksListServiceUrl = `${environment.proyectoUrl}api/libro/puntuacionLibros`;
getListBookScore(): Observable<Libro[]>{
        const credentials = localStorage.getItem('token');
        const headers = new HttpHeaders({
              'Content-Type': 'application/json',
                
              'Authorization' : credentials || ''
               
          })
    
          return this.client.get<Libro[]>(`${this.scoreBooksListServiceUrl}`,{headers})
      }
      

}
