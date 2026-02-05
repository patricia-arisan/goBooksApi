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
      return this.client.post<Libro>(`${this.bookServiceUrl}`,libro,{headers,withCredentials:true})
    }

    private readonly bookListServiceUrl = `${environment.proyectoUrl}api/libro/listadoLibros`;
    
      getBooksByNameOrder(): Observable<Libro[]>{
        const credentials = localStorage.getItem('token');
        const headers = new HttpHeaders({
              'Content-Type': 'application/json',
                
              'Authorization' : credentials || ''
               
          })
    
          return this.client.get<Libro[]>(`${this.bookListServiceUrl}`,{headers,withCredentials:true})
      }

      private readonly bookSectionServiceUrl = `${environment.proyectoUrl}api/libro`;
    
      getBookById(id: number): Observable<Libro>{
        const credentials = localStorage.getItem('token');
        const headers = new HttpHeaders({
              'Content-Type': 'application/json',
                
              'Authorization' : credentials || ''
               
          })
    
          return this.client.get<Libro>(`${this.bookSectionServiceUrl}/${id}`,{headers,withCredentials:true})
      }

      private readonly bookByGenderServiceUrl = `${environment.proyectoUrl}api/libro/categoria`;

      getBookByGenreId(id: number): Observable<Libro[]>{

        const credentials = localStorage.getItem('token');
        const headers = new HttpHeaders({
              'Content-Type': 'application/json',
                
              'Authorization' : credentials || ''
               
          })
    
          return this.client.get<Libro[]>(`${this.bookByGenderServiceUrl}/${id}`,{headers,withCredentials:true})

      }

      private readonly bookByAuthorServiceUrl = `${environment.proyectoUrl}api/libro/autor`;

      getBookByAuthorId(id: number): Observable<Libro[]>{

        const credentials = localStorage.getItem('token');
        const headers = new HttpHeaders({
              'Content-Type': 'application/json',
                
              'Authorization' : credentials || ''
               
          })
    
          return this.client.get<Libro[]>(`${this.bookByAuthorServiceUrl}/${id}`,{headers,withCredentials:true})

      }

      private readonly bookByPublisherServiceUrl = `${environment.proyectoUrl}api/libro/editorial`;

      getBookByPublisherId(id: number): Observable<Libro[]>{

        const credentials = localStorage.getItem('token');
        const headers = new HttpHeaders({
              'Content-Type': 'application/json',
                
              'Authorization' : credentials || ''
               
          })
    
          return this.client.get<Libro[]>(`${this.bookByPublisherServiceUrl}/${id}`,{headers,withCredentials:true})

      }

      private readonly lastBooksListServiceUrl = `${environment.proyectoUrl}api/libro/ultimosLibros`;
    
      getLastBooks(): Observable<Libro[]>{
        const credentials = localStorage.getItem('token');
        const headers = new HttpHeaders({
              'Content-Type': 'application/json',
                
              'Authorization' : credentials || ''
               
          })
    
          return this.client.get<Libro[]>(`${this.lastBooksListServiceUrl}`,{headers,withCredentials:true})
      }

      private readonly allLastBooksListServiceUrl = `${environment.proyectoUrl}api/libro/listaUltimosLibros`;
    
      getAllLastBooks(): Observable<Libro[]>{
        const credentials = localStorage.getItem('token');
        const headers = new HttpHeaders({
              'Content-Type': 'application/json',
                
              'Authorization' : credentials || ''
               
          })
    
          return this.client.get<Libro[]>(`${this.allLastBooksListServiceUrl}`,{headers,withCredentials:true})
      }

//////////////////////
private readonly scoreBooksListServiceUrl = `${environment.proyectoUrl}api/libro/puntuacionLibros`;
getListBookScore(): Observable<Libro[]>{
        const credentials = localStorage.getItem('token');
        const headers = new HttpHeaders({
              'Content-Type': 'application/json',
                
              'Authorization' : credentials || ''
               
          })
    
          return this.client.get<Libro[]>(`${this.scoreBooksListServiceUrl}`,{headers,withCredentials:true})
      }

private readonly bestScoreBooksServiceUrl = `${environment.proyectoUrl}api/libro/mejorPuntuacionLibros`;
getBooksBestScore(): Observable<Libro[]>{
        const credentials = localStorage.getItem('token');
        const headers = new HttpHeaders({
              'Content-Type': 'application/json',
                
              'Authorization' : credentials || ''
               
          })
    
          return this.client.get<Libro[]>(`${this.bestScoreBooksServiceUrl}`,{headers,withCredentials:true})
      }
////////////////
////////////////
private readonly searchServiceUrl = `${environment.proyectoUrl}api/libro/resultadosBusqueda`;
searchByBookAuthorEditorial(searchedWord: string): Observable<Libro[]>{
        const credentials = localStorage.getItem('token');
        const headers = new HttpHeaders({
              'Content-Type': 'application/json',
                
              'Authorization' : credentials || ''
               
          })
    
          return this.client.get<Libro[]>(`${this.searchServiceUrl}?clave=${searchedWord}`,{headers,withCredentials:true})
      }
    
/////////////////
////////////////////
      private readonly updateBookServiceUrl = `${environment.proyectoUrl}api/libro`
      updateBook(id: number,libro: Libro): Observable<Libro>{
        
            const credentials = localStorage.getItem('token');
            const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    
                    'Authorization' : credentials || ''
                   
                })
            
            return this.client.put<Libro>(`${this.updateBookServiceUrl}/${id}`,libro,{headers,withCredentials:true})
      }

      private readonly bookServiceDeleteUrl = `${environment.proyectoUrl}api/libro`;
   deleteBook(id: number): Observable<any>{
    console.log("Service " + id);
    const credentials = localStorage.getItem('token');
    const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            
            'Authorization' : credentials || ''
           
        })
    
    
    return this.client.delete<any>(`${this.bookServiceDeleteUrl}/${id}`,{headers,withCredentials:true})
    
    
  }


}
