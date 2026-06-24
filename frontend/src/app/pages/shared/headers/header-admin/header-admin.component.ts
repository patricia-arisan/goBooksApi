import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../../services/user-service';
import { Usuario } from '../../../../interfaces/usuario';

/**
 * Componente para recuperar la informacion del usuario administrador para la navegacion
 */
@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent implements OnInit{
  user!: Usuario;
  hideMenu: Boolean = true;
  hideAccount: Boolean = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private eRef: ElementRef
  ) {}

  // Recuperacion del administrador al iniciar el componente
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

  // Funcion para cerrar sesion y limpiar los datos del administrador
  logout() {
    this.userService.logoutUser().subscribe(() => {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/login']);
    });
  }

  // Funcion para mostrar u ocultar el menu desplegable
  toggleViewMenu() {
    this.hideMenu = !this.hideMenu;
  }

  // Funcion para mostrar u ocultar las opciones del administrador
  toggleViewAccount() {
    this.hideAccount = !this.hideAccount;
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: Event) {
    // Funcion para cerrar los desplegables al pinchar por la pantalla
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.hideAccount = true;
    }

    if (!this.eRef.nativeElement.contains(event.target)) {
      this.hideMenu = true;
    }
  }
}