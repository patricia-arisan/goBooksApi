import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {Observable} from 'rxjs';
import { Autor } from '../interfaces/autor';
import { AutorDTO } from '../interfaces/autorDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  

constructor(private client: HttpClient) { }
  
  private readonly authorServiceUrl = `${environment.proyectoUrl}api/autor/registroAutor`;
  
    createAuthor(autor: Autor): Observable<Autor>{
      const credentials = localStorage.getItem('token');
    const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            
            'Authorization' : credentials || '',

            //withCredentials: true ??????
            //'Cookie: SESSION=ZTIyZWI1ZmItMWI1ZS00M2Q4LTg5MGMtMWQyMjkyNTJiMzJj'
            
           
        })
        
      return this.client.post<Autor>(`${this.authorServiceUrl}`,autor,{headers})
    }

    private readonly authorListServiceUrl = `${environment.proyectoUrl}api/autor/listadoAutores`;

    getAuthorsByNameOrder(): Observable<Autor[]>{
      const credentials = localStorage.getItem('token');
      const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            
            'Authorization' : credentials || ''
           
        })

        return this.client.get<Autor[]>(`${this.authorListServiceUrl}`,{headers})
    }

    private readonly updateAuthorServiceUrl = `${environment.proyectoUrl}api/autor`
          updateAuthor(id: number,autor: Autor): Observable<Autor>{
            
                const credentials = localStorage.getItem('token');
                const headers = new HttpHeaders({
                        'Content-Type': 'application/json',
                        
                        'Authorization' : credentials || ''
                       
                    })
                
                return this.client.put<Autor>(`${this.updateAuthorServiceUrl}/${id}`,autor,{headers})
          }

          private readonly findAuthorServiceUrl = `${environment.proyectoUrl}api/autor`;
              
                getAuthorById(id: number): Observable<Autor>{
                  const credentials = localStorage.getItem('token');
                  const headers = new HttpHeaders({
                        'Content-Type': 'application/json',
                          
                        'Authorization' : credentials || ''
                         
                    })
              
                    return this.client.get<Autor>(`${this.findAuthorServiceUrl}/${id}`,{headers})
                }
 

                private readonly numberBooksAuthorListServiceUrl = `${environment.proyectoUrl}api/autor/conteoLibros`;
                getListBookAuthorNumber(): Observable<AutorDTO[]>{
                        const credentials = localStorage.getItem('token');
                        const headers = new HttpHeaders({
                              'Content-Type': 'application/json',
                                
                              'Authorization' : credentials || ''
                               
                          })
                    
                          return this.client.get<AutorDTO[]>(`${this.numberBooksAuthorListServiceUrl}`,{headers})
                      }

                 private readonly authorServiceDeleteUrl = `${environment.proyectoUrl}api/autor`;
   deleteAuthor(id: number): Observable<any>{
    console.log("Service " + id);
    const credentials = localStorage.getItem('token');
    const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            
            'Authorization' : credentials || ''
           
        })
    
    
    return this.client.delete<any>(`${this.authorServiceDeleteUrl}/${id}`,{headers})
    
    
  }

}
