import { ChangeDetectionStrategy, Component, EventEmitter, Inject, inject, OnInit, Output } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

import { GenreUpdateComponent } from '../../genre/genre-update/genre-update.component';
import { Usuario } from '../../../interfaces/usuario';

import { HeaderAdminComponent } from '../../../pages/shared/headers/header-admin/header-admin.component';
import { Editorial } from '../../../interfaces/editorial';

import { AdminBooksComponent } from '../../../pages/admin/admin-books/admin-books.component';
import { AdminPublishersComponent } from '../../../pages/admin/admin-publishers/admin-publishers.component';
import { UserService } from '../../../services/user-service';
import { PublisherService } from '../../../services/publisher-service';




@Component({
  selector: 'app-publisher-delete',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,MatButtonModule,MatDialogTitle,MatDialogContent,MatDialogActions],
  templateUrl: './publisher-delete.component.html',
  styleUrl: './publisher-delete.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
  //changeDetection: ChangeDetectionStrategy.OnPush No cargan al principio las cosas, mejor quitar esto
})
export class PublisherDeleteComponent implements OnInit{
  user!: Usuario;
 
  editorial!: Editorial;
  
  
  readonly dialogRef = inject(MatDialogRef<AdminPublishersComponent>);
  fromParentComponent: number;
    
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    
    private publisherService: PublisherService,
    
    private userService: UserService,
    
    private router: Router
  ){
    this.fromParentComponent = data;
  }

  ngOnInit(): void {

       
    

   
    this.retrieveFromLocalStorage();
    

   
      
      setTimeout(() => {
    this.findCurrentPublisher();
    }, 500);
       
      
    

     
    
  }

  retrieveFromLocalStorage() {
            this.user = JSON.parse(localStorage.getItem('usuario') || '')
            
            let value = this.userService.getItem('id');
               
            let currentUser = 0;
            if(value!=null){
              currentUser = parseInt(value);
                          
              this.userService.getLoggedUser(currentUser).subscribe((data:Usuario)=>{
                
                this.user = data;
                
                    
              });
            }  
          }

  findCurrentPublisher(){
    
    this.publisherService.getPublisherById(this.data).subscribe((data: Editorial) => {
    
          this.editorial = data;
          
    
        })
  }

  deletePublisher(){
    this.publisherService.deletePublisher(this.editorial.id).subscribe((data:any) =>{
        this.dialogRef.close(true);
        
    })
  }

  

  closeDialog(): void {
    this.dialogRef.close();
  }

  
    
  
}
