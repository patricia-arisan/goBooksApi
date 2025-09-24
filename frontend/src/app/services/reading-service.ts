import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {Observable} from 'rxjs';
import { Autor } from '../interfaces/autor';
import { LecturaDTO } from '../interfaces/lecturaDTO';
import { Lectura } from '../interfaces/lectura';

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

   private readonly readingUserServiceUrl = `${environment.proyectoUrl}api/lectura/listadoLecturas`; 

    getReadingsByUser(id: number): Observable<Lectura[]>{
        const credentials = localStorage.getItem('token');
            const headers = new HttpHeaders({
                  'Content-Type': 'application/json',
                    
                  'Authorization' : credentials || ''
                   
              })
        
              return this.client.get<Lectura[]>(`${this.readingUserServiceUrl}/${id}`,{headers})

   }
   private readonly readingUserStateServiceUrl = `${environment.proyectoUrl}api/lectura/listadoLecturasEstado`;
   
   getReadingsByUserState(idUsuario: number, idEstado: number): Observable<Lectura[]>{
            const credentials = localStorage.getItem('token');
            const headers = new HttpHeaders({
                  'Content-Type': 'application/json',
                    
                  'Authorization' : credentials || ''
                   
              })

              let params = new HttpParams().set('idEstado', idEstado);
        
              return this.client.get<Lectura[]>(`${this.readingUserStateServiceUrl}/${idUsuario}`,{headers, params:params}) 
   }

   private readonly readingAverageServiceUrl =`${environment.proyectoUrl}api/lectura/mediaPuntuacionLibro`;

   getAverageReading(idLibro: number): Observable <number>{
    const credentials = localStorage.getItem('token');
            const headers = new HttpHeaders({
                  'Content-Type': 'application/json',
                    
                  'Authorization' : credentials || ''
                   
              })
              return this.client.get<number>(`${this.readingAverageServiceUrl}/${idLibro}`,{headers})
   }

   private readonly readingBookUserServiceUrl =`${environment.proyectoUrl}api/lectura/estadoLecturaUsuario`;
   getReadingBookState(idUsuario: number, idLibro: number): Observable<Lectura>{
            const credentials = localStorage.getItem('token');
            const headers = new HttpHeaders({
                  'Content-Type': 'application/json',
                    
                  'Authorization' : credentials || ''
                   
              })

              let params = new HttpParams().set('idLibro', idLibro);
        
              return this.client.get<Lectura>(`${this.readingBookUserServiceUrl}/${idUsuario}`,{headers, params:params}) 
   }

   private readonly readingUpdateServiceUrl =`${environment.proyectoUrl}api/lectura`;

   updateReading(id: number,lectura: Lectura): Observable<Lectura>{
       //updateUser(user: Usuario): Observable<Usuario>{
       
       const credentials = localStorage.getItem('token');
       const headers = new HttpHeaders({
               'Content-Type': 'application/json',
               
               'Authorization' : credentials || ''
              
           })
       
       return this.client.put<Lectura>(`${this.readingUpdateServiceUrl}/${id}`,lectura,{headers})
     }

     private readonly readingBookServiceUrl =`${environment.proyectoUrl}api/lectura`;
      getReadingBook(idUsuario: number, idLibro: number): Observable<Lectura>{
            const credentials = localStorage.getItem('token');
            const headers = new HttpHeaders({
                  'Content-Type': 'application/json',
                    
                  'Authorization' : credentials || ''
                   
              })

              let params = new HttpParams().set('idLibro', idLibro);
        
              return this.client.get<Lectura>(`${this.readingBookServiceUrl}/${idUsuario}`,{headers, params:params}) 
   }
    
 
}
