import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { Router } from '@angular/router';

import { Usuario } from '../../../interfaces/usuario';
import { UserService } from '../../../services/user-service';

/**
 * Componente para eliminar la cuenta del usuario
 */
@Component({
  selector: 'app-user-delete',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogTitle, MatDialogContent],
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDeleteComponent implements OnInit {
  user!: Usuario;
  readonly dialogRef = inject(MatDialogRef<UserDeleteComponent>);

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  /**
   * Recuperacion del usuario al iniciar el componente
   */
  ngOnInit(): void {
    this.retrieveFromLocalStorage();
  }

  // Funcion para recuperar al usuario y cargar sus datos en el formulario
  retrieveFromLocalStorage() {
    // Recuperacion del usuario actual mediante el id guardado en el localstorage
    let value = this.userService.getItem('id');
    let currentUser = 0;
    if (value != null) {
      currentUser = parseInt(value);
      this.userService.getLoggedUser(currentUser).subscribe((data: Usuario) => {
        this.user = data;
      });
    }
  }

  // Funcion para eliminar el usuario
  deleteUser() {
    this.userService.deleteLoggedUser(this.user.id).subscribe((data: any) => {
      this.dialogRef.close(data);
      // Limpieza de datos
      localStorage.clear();
      // Redireccion al login
      this.router.navigate(['/login']);
    });
  }

  // Funcion para cerrar el dialog
  closeDialog(): void {
    this.dialogRef.close();
  }

}