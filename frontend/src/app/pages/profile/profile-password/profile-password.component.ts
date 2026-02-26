import { Component, inject, OnInit } from '@angular/core';
import { HeaderUserComponent } from '../../shared/headers/header-user/header-user.component';

import { Usuario } from '../../../interfaces/usuario';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { UserService } from '../../../services/user-service';
import { UserDeleteComponent } from '../../../modals/user/user-delete/user-delete.component';

/**
 * Componente para actualizar el password del usuario
 */
@Component({
  selector: 'app-profile-password',
  standalone: true,
  imports: [RouterLink, HeaderUserComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './profile-password.component.html',
  styleUrl: './profile-password.component.css'
})
export class ProfilePasswordComponent implements OnInit {
  user!: Usuario;
  hideMenu: Boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  /**
   * Definicion de estructura y validaciones del formulario al iniciar el componente
   * Recuperacion del usuario y rellenado de formulario
   */
  ngOnInit(): void {
    this.formPasswordUpdate = this.formBuilder.group({
      id: [0],
      // Patron de password sin espacios, que aceta numeros, letras y simbolos
      password: ["", [Validators.required, Validators.pattern("^(?=.*[a-zA-Z0-9$@#$!%*?&()+-{|},;.:_^<=>~\"'`/])(?!.*\\s).{4,}$")]],
      confirmPassword: ["", [Validators.required, Validators.pattern("^(?=.*[a-zA-Z0-9$@#$!%*?&()+-{|},;.:_^<=>~\"'`/])(?!.*\\s).{4,}$")]]
    });

    this.retrieveFromLocalStorage();
  }

  // Funcion para recuperar al usuario y cargar sus datos en el formulario
  retrieveFromLocalStorage() {
    // Recuperacion del usuario actual mediante el id guardado en el localstorage
    let value = this.userService.getItem('id');
    let currentUser = 0;
    if (value !== null) {
      currentUser = parseInt(value);
      this.userService.getLoggedUser(currentUser).subscribe((data: Usuario) => {
        this.user = data;
        // Llamada a la funcion para rellenar el formulario con los datos obtenidos
        this.fillForm();
      });
    }
  }

  // Funcion para rellenar los datos del usuario una vez retornado
  fillForm() {
    this.formPasswordUpdate.patchValue({
      id: this.user.id
    });
  }

  // Inicializacion del formulario
  formPasswordUpdate: FormGroup = new FormGroup({
    id: new FormControl(""),
    password: new FormControl(""),
    confirmPassword: new FormControl(""),
  });

  // Getters para acceder desde HTML a los controles del formulario
  get password() {
    return this.formPasswordUpdate.get('password')!;
  }

  get confirmPassword() {
    return this.formPasswordUpdate.get('confirmPassword')!;
  }

  // Funcion para actualizar el password del usuario
  update() {
    // Comparacion de las dos introducciones de password
    if (this.formPasswordUpdate.value.password === this.formPasswordUpdate.value.confirmPassword) {
      let username = this.user.username;
      let password = this.formPasswordUpdate.value.password;
      let credentials: any = {username, password};
      // Envio del nuevo password del formulario al servicio de usuario
      this.userService.updateUserPassword(this.user.id, this.formPasswordUpdate.value.password).subscribe((data: Usuario) => {
        // Envio de las credenciales con el username y el nuevo password para relanzar el login y no perder la sesion
        console.log(credentials)
        this.userService.sendUser(credentials).subscribe((data: Usuario) => {
          // Guardado en el almacenamiento local del objeto Usuario actualizado
          localStorage.setItem('usuario', JSON.stringify(data));

          const idUsuario = data.id.toString();
          this.userService.setItem('id', idUsuario);
          // Navegacion a la pagina de Perfil tras realizar todas las acciones con exito
          this.router.navigate(['/profile']);
        });        
      });
    } else {
      // Mostrar error si la password nueva y su confirmacion no coinciden
      this.formPasswordUpdate.setErrors({comparePassword: true});
    }
  }

  // Inyeccion de dependencias para usar MatDialog
  readonly dialog = inject(MatDialog);
  // Funcion para abrir el componente para eliminar la cuenta del usuario
  openDeleteUserDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(UserDeleteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  // Funcion para cerrar sesion y limpiar los datos del usuario
  logout() {
    this.userService.logoutUser().subscribe(() => {
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }

  // Funcion para mostrar u ocultar el menu desplegable
  toggleView() {
    this.hideMenu = !this.hideMenu;
  }

}