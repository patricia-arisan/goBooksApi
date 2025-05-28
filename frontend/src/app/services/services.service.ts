import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';
import { UsuarioDto } from '../interfaces/usuario-dto';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private client: HttpClient) { }
  
  private readonly userServiceUrl = `${environment.proyectoUrl}api/registroUsuario`;

  createUser(user: Usuario): Observable<Usuario>{
    return this.client.post<Usuario>(`${this.userServiceUrl}`,user)
  }

  private readonly userServiceLoginUrl = `${environment.proyectoUrl}api/login`;

  //sendUser(user: Usuario): Observable<Usuario>{
    //return this.client.post<Usuario>(`${this.userServiceLoginUrl}`,user)
  //}
  sendUser(user: UsuarioDto): Observable<boolean>{
    console.log(user);
    return this.client.post<boolean>(`${this.userServiceLoginUrl}`,user)
  }
}
