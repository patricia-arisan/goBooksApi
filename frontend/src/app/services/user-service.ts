import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Usuario } from '../interfaces/usuario';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Inyeccion del cliente http para realizar las peticiones
  constructor(private client: HttpClient) { }

  // Crear usuario
  private readonly userServiceUrl = `${environment.proyectoUrl}api/registroUsuario`;
  createUser(user: Usuario): Observable<Usuario> {
    // Peticion post que envia el objeto usuario
    return this.client.post<Usuario>(`${this.userServiceUrl}`, user);
  }

  // Autenticacion del usuario
  private readonly userServiceLoginUrl = `${environment.proyectoUrl}api/login`;
  sendUser(user: Usuario): Observable<Usuario> {
    // Creacion de las cabeceras si el usuario existe
    const headers = new HttpHeaders(user ? {
      'Content-Type': 'application/json',
      // Exposicion de la cabecera para que pueda acceder el cliente
      'Access-Control-Expose-Headers': 'Authorization',
      // Implementacion de la autenticacion básica, convirtiendo username y password a Base64 
      Authorization: 'Basic ' + btoa(user.username + ':' + user.password),
    } : {});
    // Peticion post para enviar el objeto usuario junto a las credenciales de la cabecera
    return this.client.post<Usuario>(`${this.userServiceLoginUrl}`, user, { headers, withCredentials: true })
      .pipe(tap(() => {
        // Almacenamiento del token tras el login exitoso
        localStorage.setItem('token', headers.get('Authorization') || '');
      })
      );
  }

  // Obtener el usuario autenticado mediante el id
  private readonly userServiceLoggedUrl = `${environment.proyectoUrl}api/usuario`;
  getLoggedUser(id: number): Observable<Usuario> {
    // Recuperacion del token de sesion
    const credentials = localStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });

    return this.client.get<Usuario>(`${this.userServiceLoggedUrl}/${id}`, { headers, withCredentials: true });
  }

  // Actualizar usuario
  updateUser(id: number, user: Usuario): Observable<Usuario> {
    // Recuperacion del token de sesion
    const credentials = localStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });
    // Peticion put, actualiza al usuario por su id 
    return this.client.put<Usuario>(`${this.userServiceLoggedUrl}/${id}`, user, { headers, withCredentials: true });
  }

  // Actualizar solo password del usuario
  private readonly userServiceUpdatePassUrl = `${environment.proyectoUrl}api/usuario/cambiarPassword`;
  updateUserPassword(id: number, password: string): Observable<Usuario> {
    // Recuperacion del token
    const credentials = localStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });
    // Creacion del objeto password
    const body = { password: password };
    // Peticion put, actualiza el password del usuario por su id
    return this.client.put<Usuario>(`${this.userServiceUpdatePassUrl}/${id}`, body, { headers, withCredentials: true });
  }

  // Eliminar usuario
  private readonly userServiceDeleteUrl = `${environment.proyectoUrl}api/usuario`;
  deleteLoggedUser(id: number): Observable<any> {
    // Recuperacion del token
    const credentials = localStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });
    // Peticion delete con id del usuario para eliminar el registro
    return this.client.delete<any>(`${this.userServiceDeleteUrl}/${id}`, { headers, withCredentials: true });
  }

  // Cerrar sesion
  private readonly userServiceLogoutUrl = `${environment.proyectoUrl}auth/logout`;
  logoutUser() {
    // Recuperacion del token
    const credentials = localStorage.getItem('token');
    // Cabecera de autenticacion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credentials || ''
    });

    return this.client.post(`${this.userServiceLogoutUrl}`, null, { headers, withCredentials: true });
  }

  // Funcion para el guardado en el almacenamiento local
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  // Funcion para recuperar un valor almacenado
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  // Funcion para comprobar el inicio de sesion del usuario, si hay un token almacenado devuelve true
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // Funcion para verificar si el usuario tiene el rol de Administrador
  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('usuario') || '');
    if (user) {
      // Obtencion del nombre del rol para su comprobacion
      let rol = user.rol.nombre;
      return rol === 'Administrador'
    }
    return false;
  }

  // Funcion para verificar si el usuario tiene el rol de Usuario
  isUser(): boolean {
    const user = JSON.parse(localStorage.getItem('usuario') || '');
    if (user) {
      // Obtencion del nombre del rol para su comprobacion
      let rol = user.rol.nombre;
      return rol === 'Usuario'
    }
    return false;
  }

}