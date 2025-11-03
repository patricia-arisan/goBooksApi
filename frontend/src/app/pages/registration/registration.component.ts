import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Rol } from '../../interfaces/rol';
import { Usuario } from '../../interfaces/usuario';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterLink,FormsModule, ReactiveFormsModule],
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
      nombre:[""],
      apellido:[""],
      username:["",[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password:["",[Validators.required]],
      fechaNacimiento:[null],
      rol:[{id:2}]
      //Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
//       At least 8 characters in length
// Lowercase letters
// Uppercase letters
// Numbers
// Special characters
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
    this.userService.createUser(this.formNewUser.value).subscribe((data:Usuario) =>{
      console.log(data);
      this.router.navigate(['/login']);
    }, error=> {
      if(error){
        this.formNewUser.setErrors({founduser: true})
      }
    })
  };
  
}

