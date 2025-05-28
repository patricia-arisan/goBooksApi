import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-login',
  imports: [RouterLink,FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
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
    
    sessionStorage.setItem('token', '');
  }

  formLogin:FormGroup = new FormGroup({
    username: new FormControl(""),
    password:new FormControl(""),
  })

  login(){
      //this.userService.sendUser(this.formLogin.value).subscribe((data:Usuario) =>{
        //console.log(data);
        //this.router.navigate(['/home']);
      //})
        this.userService.sendUser(this.formLogin.value).subscribe(isValid =>{
        if(isValid) {
          sessionStorage.setItem(
          'token', 
          btoa(this.formLogin.get("username") + ':' + this.formLogin.get("password"))
          );
          this.router.navigate(['/home']);
          } else {
        alert("Authentication failed.")
    }
        
        
      })
    };
    
    
}
