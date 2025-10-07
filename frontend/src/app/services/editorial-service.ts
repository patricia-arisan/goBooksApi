import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {Observable} from 'rxjs';
import { Editorial } from '../interfaces/editorial';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {
  

constructor(private client: HttpClient) { }
  
  private readonly editorialServiceUrl = `${environment.proyectoUrl}api/editorial/registroEditorial`;
  
    createEditorial(editorial: Editorial): Observable<Editorial>{
      const credentials = localStorage.getItem('token');
    const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            
            'Authorization' : credentials || '',

            //withCredentials: true ??????
            //'Cookie: SESSION=ZTIyZWI1ZmItMWI1ZS00M2Q4LTg5MGMtMWQyMjkyNTJiMzJj'
            
           
        })
        
      return this.client.post<Editorial>(`${this.editorialServiceUrl}`,editorial,{headers})
    }

    private readonly editorialListServiceUrl = `${environment.proyectoUrl}api/editorial/listadoEditoriales`;

    getEditorialsByNameOrder(): Observable<Editorial[]>{
      const credentials = localStorage.getItem('token');
      const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            
            'Authorization' : credentials || ''
           
        })

        return this.client.get<Editorial[]>(`${this.editorialListServiceUrl}`,{headers})
    }

    private readonly updatePublisherServiceUrl = `${environment.proyectoUrl}api/editorial`
              updatePublisher(id: number,editorial: Editorial): Observable<Editorial>{
                
                    const credentials = localStorage.getItem('token');
                    const headers = new HttpHeaders({
                            'Content-Type': 'application/json',
                            
                            'Authorization' : credentials || ''
                           
                        })
                    
                    return this.client.put<Editorial>(`${this.updatePublisherServiceUrl}/${id}`,editorial,{headers})
              }
    
              private readonly findPublisherServiceUrl = `${environment.proyectoUrl}api/editorial`;
                  
                    getPublisherById(id: number): Observable<Editorial>{
                      const credentials = localStorage.getItem('token');
                      const headers = new HttpHeaders({
                            'Content-Type': 'application/json',
                              
                            'Authorization' : credentials || ''
                             
                        })
                  
                        return this.client.get<Editorial>(`${this.findPublisherServiceUrl}/${id}`,{headers})
                    }
 
}
