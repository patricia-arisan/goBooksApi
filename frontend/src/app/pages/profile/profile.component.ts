import { Component, inject, OnInit } from '@angular/core';
import { HeaderUserComponent } from '../shared/headers/header-user/header-user.component';
import { ServicesService } from '../../services/services.service';
import { Usuario } from '../../interfaces/usuario';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Rol } from '../../interfaces/rol';
import { take } from 'rxjs';

import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DeleteUserComponent } from '../../modals/delete-item/delete-user/delete-user.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink,HeaderUserComponent,FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user!: Usuario;
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: ServicesService,
    private router: Router
  ){}

  ngOnInit(): void {
    
      this.retrieveFromLocalStorage();

      

      this.formUpdate = this.formBuilder.group ({
        id:[0],
        nombre:["",[Validators.required]],
        apellido:[""],
        username:["",[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        password:["",[Validators.required]],
        fechaNacimiento:[new Date],
        rol:[{id:2}]
      })

    

      this.fillForm();
      
      
    }
    
    
    retrieveFromLocalStorage() {
      console.log(localStorage)
      this.user = JSON.parse(localStorage.getItem('usuario') || '')
      //this.user = JSON.parse(localStorage.getItem('currentUser') || '')
      console.log(this.user)
      let value = this.userService.getItem('id');
    // //   let credential1 = this.user.username;
    // // let credential2 = this.user.password;
    // // let credentials = {credential1,credential2};

      console.log("Value antes de current: " + value)
    
      let currentUser = 0;
      if(value!=null){
        currentUser = parseInt(value);
        console.log("dentro: " + currentUser)
        // // this.userService.getLoggedUser(currentUser,credentials).subscribe((data:Usuario)=>{
          
        // //   this.user = data;
          
        // //   console.log("Local" + this.user.id);
          
        // // });

        this.userService.getLoggedUser(currentUser).subscribe((data:Usuario)=>{
          
          this.user = data;
          
          console.log("Local" + this.user.id);
          
        });
      }
      
      
    }

    fillForm(){
        this.formUpdate.patchValue({
          id: this.user.id,
          nombre: this.user.nombre,
          apellido: this.user.apellido,
          username : this.user.username,
          password : this.user.password,
          fechaNacimiento: this.user.fechaNacimiento
    })
      
    }

    formUpdate:FormGroup = new FormGroup({
      id: new FormControl(""),
      nombre: new FormControl(""),
      apellido: new FormControl(""),
      username: new FormControl(""),
      password:new FormControl(""),
      fechaNacimiento:new FormControl(new Date),
      rol:new FormControl(0)
    })

    rol: Rol = {
        id: 2,
        nombre:""
      };
    
    update(){
      
      console.log(this.formUpdate.value);
      console.log(this.user.id)
      
      this.userService.updateUser(this.user.id,this.formUpdate.value).subscribe((data:Usuario) =>{
      //this.userService.updateUser(this.formUpdate.value).subscribe((data:Usuario) =>{
      console.log(data);
      
      localStorage.setItem('usuario', JSON.stringify(data));
      
        const idUsuario = data.id.toString();
        
        this.userService.setItem('id',idUsuario);
        
        this.router.navigate(['/home']);
    })
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
