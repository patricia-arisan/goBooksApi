import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Rol } from '../../interfaces/rol';
import { Usuario } from '../../interfaces/usuario';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

constructor(
    private formBuilder: FormBuilder,
    private userService: ServicesService,
    private router: Router
  ){}

  ngOnInit(): void {
    
    this.formNewUser = this.formBuilder.group ({
      id:[0],
      nombre:["",[Validators.required]],
      apellido:[""],
      username:["",[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password:["",[Validators.required]],
      fechaNacimiento:[new Date],
      rol:[{id:2}]
      
    });

  }

  formNewUser:FormGroup = new FormGroup({
    id: new FormControl(0),
    nombre: new FormControl(""),
    username: new FormControl(""),
    password:new FormControl(""),
    fechaNacimiento:new FormControl(new Date),
    rol:new FormControl(0)
  })
  
  rol: Rol = {
    id: 2,
    nombre:""
  };

  register(){
    this.userService.createUser(this.formNewUser.value).subscribe((data:Usuario) =>{
      console.log(data);
      this.router.navigate(['/login']);
    })
  };
  
}

