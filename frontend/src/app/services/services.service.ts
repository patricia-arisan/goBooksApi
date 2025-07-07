import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Usuario } from '../interfaces/usuario';
import { BehaviorSubject, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  //private readonly currentUserSubject: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>({} as Usuario);

constructor(private client: HttpClient) { }
  
  private readonly userServiceUrl = `${environment.proyectoUrl}api/registroUsuario`;

  createUser(user: Usuario): Observable<Usuario>{
    console.log("POST " + user)
    return this.client.post<Usuario>(`${this.userServiceUrl}`,user)
  }

  private readonly userServiceLoginUrl = `${environment.proyectoUrl}api/login`;

  sendUser(user: Usuario): Observable<Usuario>{
    console.log(user);
    
    const headers = new HttpHeaders(user ? {
            'Content-Type': 'application/json',
            'Access-Control-Expose-Headers': 'Authorization',
            
            Authorization :'Basic ' + btoa(user.username + ':' + user.password),
            
            
        } : {});
        console.log(headers); 
        localStorage.setItem('token',headers.get('Authorization')|| '');
        // return this.client.post<Usuario>(`${this.userServiceLoginUrl}`,'user', {headers: headers})
        return this.client.post<Usuario>(`${this.userServiceLoginUrl}`,user,{headers})
        
          
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    
    return localStorage.getItem(key);
  }


  private readonly userServiceLoggedUrl = `${environment.proyectoUrl}api/usuario`;

  
  getLoggedUser(id: number): Observable<Usuario>{
    console.log("Service " + id);
    const credentials = localStorage.getItem('token');
    const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            
            'Authorization' : credentials || ''
           
        })
    
    
    return this.client.get<Usuario>(`${this.userServiceLoggedUrl}/${id}`,{headers})
    
    
  }
 
 updateUser(id: number,user: Usuario): Observable<Usuario>{
    //updateUser(user: Usuario): Observable<Usuario>{
    console.log("PUT " + user)
    const credentials = localStorage.getItem('token');
    const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            
            'Authorization' : credentials || ''
           
        })
    
    return this.client.put<Usuario>(`${this.userServiceLoggedUrl}/${id}`,user,{headers})
  }

  private readonly userServiceLogoutUrl = `${environment.proyectoUrl}auth/logout`;

  logoutUser(){
    const credentials = localStorage.getItem('token');
    const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            
            'Authorization' : credentials || ''
           
        })

    return this.client.post(`${this.userServiceLogoutUrl}`,null,{headers})
  }
  
 
}
