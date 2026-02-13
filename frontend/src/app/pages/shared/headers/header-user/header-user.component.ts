import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../../services/user-service';
import { Usuario } from '../../../../interfaces/usuario';

/**
 * Componente para recuperar la informacion del usuario para la navegacion
 */
@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.css'
})
export class HeaderUserComponent implements OnInit {
  user!: Usuario;
  hideMenu: Boolean = true;
  hideAccount: Boolean = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private eRef: ElementRef
  ) {}

  // Recuperacion del usuario al iniciar el componente
  ngOnInit(): void {
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
      });
    }
  }

  // Funcion para cerrar sesion y limpiar los datos del usuario
  logout() {
    this.userService.logoutUser().subscribe(() => {
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }

  // Funcion para mostrar u ocultar el menu desplegable
  toggleViewMenu() {
    this.hideMenu = !this.hideMenu;
  }

  // Funcion para mostrar u ocultar las opciones del usuario
  toggleViewAccount() {
    this.hideAccount = !this.hideAccount;
  }

  @HostListener('document:click', ['$event'])
  // Funcion para cerrar los desplegables al pinchar por la pantalla
  clickOut(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.hideAccount = true;
    }

    if (!this.eRef.nativeElement.contains(event.target)) {
      this.hideMenu = true;
    }
  }
}