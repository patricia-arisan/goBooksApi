import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


import { Router } from '@angular/router';
import { ProfileComponent } from '../../../pages/profile/profile.component';

import { Usuario } from '../../../interfaces/usuario';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-user-delete',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDeleteComponent implements OnInit{
  user!: Usuario;

  readonly dialogRef = inject(MatDialogRef<ProfileComponent>);
  
  constructor(
    private userService: UserService,
    private router: Router
    
    
  ){}

  ngOnInit(): void {

    this.retrieveFromLocalStorage();
    

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

  deleteUser(){
    this.userService.deleteLoggedUser(this.user.id).subscribe((data:any) =>{
      // if(data.toString()==="Se ha eliminado"){
        this.dialogRef.close(data);
        localStorage.clear();
        this.router.navigate(['/login']);
      // }
  })
}

closeDialog(): void {
    this.dialogRef.close();
  }
  


}
