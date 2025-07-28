import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  
constructor(
    private formBuilder: FormBuilder,
    private userService: ServicesService,
    private router: Router
  ){}
  
  ngOnInit(): void{
    this.formLogin = this.formBuilder.group ({
      username:["",[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password:["",[Validators.required]]
    });
    
    
  }



  formLogin:FormGroup = new FormGroup({
    username: new FormControl(""),
    password:new FormControl(""),
  })

  get username(){
    return this.formLogin.get('username')!;
  }

  get password(){
    return this.formLogin.get('password')!;
  }

  login(){
      console.log(this.formLogin.value);
      
      console.log(localStorage)
     
      
      this.userService.sendUser(this.formLogin.value).subscribe((data:Usuario) =>{
        
        //  localStorage.setItem('token',btoa(data.username + ':' + data.password))  
        //  let cred = localStorage.getItem('token')
        // console.log('cred: ' + cred)  
        
        
        ////////////////////
        console.log(data);
        localStorage.setItem('usuario', JSON.stringify(data));
      //////////////////
          
        
              /////////////////////

        console.log("LOGIN " + data);
        const idUsuario = data.id.toString();
        
        this.userService.setItem('id',idUsuario);
        console.log("LOGIN " + idUsuario);
        this.router.navigate(['/home']);

        
      })

      
        
    };


    
}
