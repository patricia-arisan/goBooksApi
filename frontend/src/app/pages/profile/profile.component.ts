import { Component, inject, OnInit } from '@angular/core';
import { HeaderUserComponent } from '../shared/headers/header-user/header-user.component';

import { Usuario } from '../../interfaces/usuario';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Rol } from '../../interfaces/rol';
import { take } from 'rxjs';

import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DeleteUserComponent } from '../../modals/delete-item/delete-user/delete-user.component';
import { DatePipe } from '@angular/common';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink,HeaderUserComponent,FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [DatePipe]
})
export class ProfileComponent implements OnInit{
  user!: Usuario;
  fechaActual!:Date;
  fechaFormat!:string | null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private transformDate: DatePipe
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
      
      this.fechaActual= new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate());
    this.fechaFormat=this.transformDate.transform(this.fechaActual,"yyyy-MM-dd");
      
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

     get username(){
    return this.formUpdate.get('username')!;
  }  
    
    update(){
      console.log(this.formUpdate.value);
      console.log(this.user.id)
      let oldUsername = this.user.username;      
      this.userService.updateUser(this.user.id,this.formUpdate.value).subscribe({next:(data:Usuario) =>{
      
      console.log(data);
      if(oldUsername===this.formUpdate.value.username){
        localStorage.setItem('usuario', JSON.stringify(data));
        const idUsuario = data.id.toString();
        this.userService.setItem('id',idUsuario);
        this.router.navigate(['/home']);
      }else{
        this.logout();
      }
    
      
    }, error: (errorRes)=> {
      if(errorRes){
        this.formUpdate.setErrors({foundUser: true})
      }
    }
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
