import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';
import { UserService } from '../../services/user-service';

/**
 * Componente para autenticar al usuario
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  // Definicion de estructura y validaciones del formulario al iniciar el componente
  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ["", [Validators.required]]
    });
  }
  // Inicializacion del formulario
  formLogin: FormGroup = new FormGroup({
    username: new FormControl(""),
    password: new FormControl(""),
  });

  // Getters para acceder desde HTML a los controles del formulario
  get username() {
    return this.formLogin.get('username')!;
  }

  get password() {
    return this.formLogin.get('password')!;
  }

  // Funcion que ejecuta el inicio de sesion
  login() {
    // Envio de datos del formulario al servicio de usuario
    this.userService.sendUser(this.formLogin.value).subscribe({
      next: (data: Usuario) => {
        // Guardado en el almacenamiento local del objeto Usuario
        localStorage.setItem('usuario', JSON.stringify(data));
        
        // Guardado independiente del id
        const idUsuario = data.id.toString();
        this.userService.setItem('id', idUsuario);

        // Redireccion del usuario a la home en funcion de su rol
        if (data.rol.id === 1) {
          // Navegacion administardor
          this.router.navigate(['/admin-home']);
        } else {
          // Navegacion usuario normal
          this.router.navigate(['/home']);
        }
      }, error: (error) => {
        // Mostrar error de autenticacion si no se loguea correctamente
        if (error) {
          this.formLogin.setErrors({unAuthenticated: true});
        }
      }
    });
  }
}