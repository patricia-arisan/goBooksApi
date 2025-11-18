import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Rol } from '../../interfaces/rol';
import { Usuario } from '../../interfaces/usuario';
import { ServicesService } from '../../services/services.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterLink,FormsModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  providers: [DatePipe]
  
})
export class RegistrationComponent {
  fechaActual!:Date;
  fechaFormat!:string | null;



constructor(
    private formBuilder: FormBuilder,
    private userService: ServicesService,
    private router: Router,
    private transformDate: DatePipe
  ){}

  ngOnInit(): void {
    this.fechaActual= new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate());
    this.fechaFormat=this.transformDate.transform(this.fechaActual,"yyyy-MM-dd");
    console.log(this.fechaActual)
    this.formNewUser = this.formBuilder.group ({
      id:[0],
      nombre:[""],
      apellido:[""],
      username:["",[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password:["",[Validators.required,Validators.pattern("^(?=.*[a-zA-Z0-9$@#$!%*?&()+-{|},;.:_^<=>~\"'`/])(?!.*\\s).{4,}$")]],
      fechaNacimiento:[null],
      rol:[{id:2}]
      // (?!.*\\s) para evitar espacios, \\ doble con s para que funcione con comillas en vez 
      // de / al principio y al final del pattern
      // Acepta letras, numeros y simbolos sin obligar que se use uno de cada
    });

  }

  formNewUser:FormGroup = new FormGroup({
    id: new FormControl(0),
    nombre: new FormControl(""),
    apellido: new FormControl(""),
    username: new FormControl(""),
    password:new FormControl(""),
    fechaNacimiento:new FormControl(new Date),
    rol:new FormControl(0)
  })

  get username(){
    return this.formNewUser.get('username')!;
  }

  get password(){
    return this.formNewUser.get('password')!;
  }
  
  // rol: Rol = {
  //   id: 2,
  //   nombre:""
  // };

  register(){
    this.userService.createUser(this.formNewUser.value).subscribe({next:(data:Usuario) =>{
      console.log(data);
      this.router.navigate(['/login']);
    }, error: (errorRes)=> {
      if(errorRes){
        this.formNewUser.setErrors({foundUser: true})
      }
    }
    })
  
  };
  
}

