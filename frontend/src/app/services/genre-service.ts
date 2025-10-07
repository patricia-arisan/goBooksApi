import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {Observable} from 'rxjs';
import { Genero } from '../interfaces/genero';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  

constructor(private client: HttpClient) { }
  
  private readonly genreServiceUrl = `${environment.proyectoUrl}api/genero/registroGenero`;
  
    createGenre(genero: Genero): Observable<Genero>{
      const credentials = localStorage.getItem('token');
    const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            
            'Authorization' : credentials || '',

            //withCredentials: true ??????
            //'Cookie: SESSION=ZTIyZWI1ZmItMWI1ZS00M2Q4LTg5MGMtMWQyMjkyNTJiMzJj'
            
           
        })
        
      return this.client.post<Genero>(`${this.genreServiceUrl}`,genero,{headers})
    }

    private readonly genreListServiceUrl = `${environment.proyectoUrl}api/genero/listadoGeneros`;

    getGenresByNameOrder(): Observable<Genero[]>{
      const credentials = localStorage.getItem('token');
      const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            
            'Authorization' : credentials || ''
           
        })

        return this.client.get<Genero[]>(`${this.genreListServiceUrl}`,{headers})
    }

        private readonly updateGenreServiceUrl = `${environment.proyectoUrl}api/genero`
              updateGenre(id: number,genero: Genero): Observable<Genero>{
                
                    const credentials = localStorage.getItem('token');
                    const headers = new HttpHeaders({
                            'Content-Type': 'application/json',
                            
                            'Authorization' : credentials || ''
                           
                        })
                    
                    return this.client.put<Genero>(`${this.updateGenreServiceUrl}/${id}`,genero,{headers})
              }
    
              private readonly findGenreServiceUrl = `${environment.proyectoUrl}api/genero`;
                  
                    getGenreById(id: number): Observable<Genero>{
                      const credentials = localStorage.getItem('token');
                      const headers = new HttpHeaders({
                            'Content-Type': 'application/json',
                              
                            'Authorization' : credentials || ''
                             
                        })
                  
                        return this.client.get<Genero>(`${this.findGenreServiceUrl}/${id}`,{headers})
                    }
 
}
