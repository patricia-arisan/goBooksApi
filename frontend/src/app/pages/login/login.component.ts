import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Usuario } from '../../interfaces/usuario';
import { UserService } from '../../services/user-service';

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
  ) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ["", [Validators.required]]
    });
  }

  formLogin: FormGroup = new FormGroup({
    username: new FormControl(""),
    password: new FormControl(""),
  })

  get username() {
    return this.formLogin.get('username')!;
  }

  get password() {
    return this.formLogin.get('password')!;
  }

  login() {
    console.log(this.formLogin.value);

    console.log(localStorage)


    this.userService.sendUser(this.formLogin.value).subscribe({next:(data: Usuario) => {

     
      console.log(data);
      localStorage.setItem('usuario', JSON.stringify(data));
      //////////////////


      /////////////////////

      console.log("LOGIN " + data);
      const idUsuario = data.id.toString();

      this.userService.setItem('id', idUsuario);
      console.log("LOGIN " + idUsuario);
      
         if(data.rol.id===1){
        this.router.navigate(['/admin-home']);
      }else{
        
        this.router.navigate(['/home']);
      }
    }, error: (error)=>{
      if(error) {
        this.formLogin.setErrors({unAuthenticated: true})
      }
    }
    })
  };
}
