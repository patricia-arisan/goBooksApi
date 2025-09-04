import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


import { Router } from '@angular/router';
import { ProfileComponent } from '../../../pages/profile/profile.component';
import { ServicesService } from '../../../services/services.service';
import { Usuario } from '../../../interfaces/usuario';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteUserComponent implements OnInit{
  user!: Usuario;

  readonly dialogRef = inject(MatDialogRef<ProfileComponent>);
  
  constructor(
    private userService: ServicesService,
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
  


}
