import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {Observable} from 'rxjs';
import { Genero } from '../interfaces/genero';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  

constructor(private client: HttpClient) { }
  
  private readonly genderServiceUrl = `${environment.proyectoUrl}api/genero/registroGenero`;
  
    createGender(genero: Genero): Observable<Genero>{
      const credentials = localStorage.getItem('token');
    const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            
            'Authorization' : credentials || '',

            //withCredentials: true ??????
            //'Cookie: SESSION=ZTIyZWI1ZmItMWI1ZS00M2Q4LTg5MGMtMWQyMjkyNTJiMzJj'
            
           
        })
        
      return this.client.post<Genero>(`${this.genderServiceUrl}`,genero,{headers})
    }

    private readonly genderListServiceUrl = `${environment.proyectoUrl}api/genero/listadoGeneros`;

    getGendersByNameOrder(): Observable<Genero[]>{
      const credentials = localStorage.getItem('token');
      const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            
            'Authorization' : credentials || ''
           
        })

        return this.client.get<Genero[]>(`${this.genderListServiceUrl}`,{headers})
    }
 
}
