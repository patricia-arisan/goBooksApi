import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';
import { DatePipe } from '@angular/common';
import { UserService } from '../../services/user-service';

/**
 * Componente para registrar al usuario
 */
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  providers: [DatePipe]
})
export class RegistrationComponent {
  currentDate!: Date;
  dateFormat!: string | null;
  defaultName: string = "Usuario";

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private transformDate: DatePipe
  ) { }
  
  /**
   * Obtencion de la fecha actual formateda para fijar la fecha maxima a seleccionar
   * Definicion de estructura y validaciones del formulario al iniciar el componente
   */
  ngOnInit(): void {
    this.currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    this.dateFormat = this.transformDate.transform(this.currentDate, "yyyy-MM-dd");
    
    this.formNewUser = this.formBuilder.group({
      id: [0],
      nombre: [""],
      apellido: [""],
      username: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      // Patron de password sin espacios, que aceta numeros, letras y simbolos
      password: ["", [Validators.required, Validators.pattern("^(?=.*[a-zA-Z0-9$@#$!%*?&()+-{|},;.:_^<=>~\"'`/])(?!.*\\s).{4,}$")]],
      fechaNacimiento: [null],
      rol: [{id:2}]
    });
  }

  // Inicializacion del formulario
  formNewUser: FormGroup = new FormGroup({
    id: new FormControl(0),
    nombre: new FormControl(""),
    apellido: new FormControl(""),
    username: new FormControl(""),
    password: new FormControl(""),
    fechaNacimiento: new FormControl(new Date),
    rol: new FormControl(0)
  });

  // Getters para acceder desde HTML a los controles del formulario
  get username() {
    return this.formNewUser.get('username')!;
  }

  get password() {
    return this.formNewUser.get('password')!;
  }

  // Funcion que ejecuta el registro del nuevo usuario
  register() {
    // Nombre de usuario por defecto para si el usuario no pone uno
    if (this.formNewUser.value.nombre === "" || this.formNewUser.value.nombre === null) {
      this.fillForm();
    }
    // Envio de datos del formulario al servicio de usuario
    this.userService.createUser(this.formNewUser.value).subscribe({
      next: (data: Usuario) => {
        // Redireccion a la pagina de login si el guardado de datos ha sido exitoso
        this.router.navigate(['/login']);
      }, error: (errorRes) => {
        if (errorRes) {
          // Mostrar error de registro si la direccion de correo ya se encuentra registrada en la bbdd
          this.formNewUser.setErrors({foundUser: true});
        }
      }
    });
  }

  // Funcion para rellenar el nombre del usuario
  fillForm() {
    this.formNewUser.patchValue({
      nombre: this.defaultName,
    });
  }

}