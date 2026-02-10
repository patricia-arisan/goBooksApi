import { Component, inject, OnInit } from '@angular/core';
import { HeaderUserComponent } from '../shared/headers/header-user/header-user.component';

import { Usuario } from '../../interfaces/usuario';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { DatePipe } from '@angular/common';
import { UserService } from '../../services/user-service';
import { UserDeleteComponent } from '../../modals/user/user-delete/user-delete.component';

/**
 * Componente para actualizar la informacion del usuario
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, HeaderUserComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [DatePipe]
})
export class ProfileComponent implements OnInit {
  user!: Usuario;
  currentDate!: Date;
  dateFormat!: string | null;
  hideMenu: Boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private transformDate: DatePipe,    
  ) {}

  /**
   * Definicion de estructura y validaciones del formulario al iniciar el componente
   * Recuperacion del usuario y rellenado de formulario
   * Obtencion de la fecha actual formateda para fijar la fecha maxima a seleccionar
   */
  ngOnInit(): void {
    this.formUpdate = this.formBuilder.group({
      id: [0],
      nombre: [""],
      apellido: [""],
      username: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ["", [Validators.required]],
      fechaNacimiento: [new Date],
      rol: this.formBuilder.group({
        id: [null]
      })
    });

    this.retrieveFromLocalStorage();
   
    this.currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    this.dateFormat = this.transformDate.transform(this.currentDate, "yyyy-MM-dd");

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
    this.formUpdate.patchValue({
      id: this.user.id,
      nombre: this.user.nombre,
      apellido: this.user.apellido,
      username: this.user.username,
      password: this.user.password,
      fechaNacimiento: this.user.fechaNacimiento,
      rol: {
        id: this.user.rol.id        
      }
    });
  }

  // Inicializacion del formulario
  formUpdate: FormGroup = new FormGroup({
    id: new FormControl(""),
    nombre: new FormControl(""),
    apellido: new FormControl(""),
    username: new FormControl(""),
    password: new FormControl(""),
    fechaNacimiento: new FormControl(""),
    rol: new FormGroup({
      id: new FormControl(null)    
    })
  });

  // Getter para acceder desde HTML a los controles del formulario
  get username() {
    return this.formUpdate.get('username')!;
  }

  // Funcion para actualizar los datos del usuario
  update() {
    // Nombre de usuario por defecto para si el usuario no pone uno
    if (this.formUpdate.value.nombre === "" || this.formUpdate.value.nombre === null) {
      this.formUpdate.patchValue({
        nombre: "Usuario",
      });
    }

    let oldUsername = this.user.username;
    // Envio de los nuevos datos del formulario al servicio de usuario
    this.userService.updateUser(this.user.id, this.formUpdate.value).subscribe({
      next: (data: Usuario) => {
        // Si el username se mantiene y cambian los demas datos, estos se actualizan en el localStorage
        if (oldUsername === this.formUpdate.value.username) {
          localStorage.setItem('usuario', JSON.stringify(data));
          // Tras los cambios se redirige a la home
          this.router.navigate(['/home']);
        } else {
          // Si cambia el username, se redirige al login para iniciar sesion con el nuevo username
          this.logout();
        }
      }, error: (errorRes) => {
        if (errorRes) {
          /**
           * Mostrar error de registro si la direccion de correo ya se encuentra registrada en la bbdd
           * con un usuario con distinto id
           */
          this.formUpdate.setErrors({foundUser: true});
        }
      }
    });
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