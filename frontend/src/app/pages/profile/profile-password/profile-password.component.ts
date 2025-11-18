import { Component, inject, OnInit } from '@angular/core';
import { HeaderUserComponent } from '../../shared/headers/header-user/header-user.component';
import { ServicesService } from '../../../services/services.service';
import { Usuario } from '../../../interfaces/usuario';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Rol } from '../../../interfaces/rol';

import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DeleteUserComponent } from '../../../modals/delete-item/delete-user/delete-user.component';


@Component({
  selector: 'app-profile-password',
  standalone: true,
  imports: [RouterLink,HeaderUserComponent,FormsModule, ReactiveFormsModule],
  templateUrl: './profile-password.component.html',
  styleUrl: './profile-password.component.css'
})
export class ProfilePasswordComponent implements OnInit{
  user!: Usuario;
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: ServicesService,
    private router: Router
  ){}

  ngOnInit(): void {
    
      this.retrieveFromLocalStorage();

      

      this.formPasswordUpdate = this.formBuilder.group ({
        id:[0],
        password:["",[Validators.required,Validators.pattern("^(?=.*[a-zA-Z0-9$@#$!%*?&()+-{|},;.:_^<=>~\"'`/])(?!.*\\s).{4,}$")]],
        confirmPassword:["",[Validators.required,Validators.pattern("^(?=.*[a-zA-Z0-9$@#$!%*?&()+-{|},;.:_^<=>~\"'`/])(?!.*\\s).{4,}$")]]
      })

      this.fillForm();
      
      
    }
    
    
    retrieveFromLocalStorage() {
      this.user = JSON.parse(localStorage.getItem('usuario') || '')
      console.log(this.user)
      let value = this.userService.getItem('id');
      let currentUser = 0;
      if(value!=null){
        currentUser = parseInt(value);
        
        this.userService.getLoggedUser(currentUser).subscribe((data:Usuario)=>{
          
          this.user = data;
        });
      }
      
      
    }

    fillForm(){
        this.formPasswordUpdate.patchValue({
          id: this.user.id,
          
    })
      
    }

    formPasswordUpdate:FormGroup = new FormGroup({
      id: new FormControl(""),
        password:new FormControl(""),
        confirmPassword:new FormControl(""),
      
    })

    get password(){
    return this.formPasswordUpdate.get('password')!;
  }

  get confirmPassword(){
    return this.formPasswordUpdate.get('confirmPassword')!;
  }

    
    update(){
      if(this.formPasswordUpdate.value.password === this.formPasswordUpdate.value.confirmPassword){
      //////////////////////////////////////  
      let username = this.user.username;
      let password = this.formPasswordUpdate.value.password;
      let credentials:any ={username,password};
        this.userService.updateUserPassword(this.user.id,this.formPasswordUpdate.value.password).subscribe((data:Usuario) =>{
          console.log(data);
          this.userService.sendUser(credentials).subscribe((data:Usuario) =>{
              console.log(localStorage);
                  localStorage.setItem('usuario', JSON.stringify(data));
                  console.log(localStorage);
                
                
                  const idUsuario = data.id.toString();
                  
                  this.userService.setItem('id',idUsuario);
            })
        
                    
          this.router.navigate(['/profile']);
          
         
      })
    ////////////////////////////////////
    }else{
    
     this.formPasswordUpdate.setErrors({comparePassword: true})
    }
    };

    readonly dialog = inject(MatDialog);

    openDeleteUserDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
        this.dialog.open(DeleteUserComponent, {
          width: '250px',
          enterAnimationDuration,
          exitAnimationDuration,
        })
      
      }

      logout(){
      this.userService.logoutUser().subscribe(()=>{
      localStorage.clear();
      this.router.navigate(['/login']);
    });
    
  }
}
