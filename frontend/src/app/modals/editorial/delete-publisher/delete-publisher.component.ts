import { ChangeDetectionStrategy, Component, EventEmitter, Inject, inject, OnInit, Output } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';


import { UpdatePublisherComponent } from '../update-publisher/update-publisher.component';
import { GenreUpdateComponent } from '../../genre/genre-update/genre-update.component';
import { Usuario } from '../../../interfaces/usuario';

import { HeaderAdminComponent } from '../../../pages/shared/headers/header-admin/header-admin.component';
import { Libro } from '../../../interfaces/libro';
import { Autor } from '../../../interfaces/autor';
import { Editorial } from '../../../interfaces/editorial';
import { Genero } from '../../../interfaces/genero';
import { BookService } from '../../../services/book-service';
import { AuthorService } from '../../../services/author-service';
import { EditorialService } from '../../../services/editorial-service';
import { GenreService } from '../../../services/genre-service';
import { AdminBooksComponent } from '../../../pages/admin/admin-books/admin-books.component';
import { UpdateBookComponent } from '../../../pages/admin/admin-books/update-book/update-book.component';
import { AdminAuthorsComponent } from '../../../pages/admin/admin-authors/admin-authors.component';
import { AdminPublishersComponent } from '../../../pages/admin/admin-publishers/admin-publishers.component';
import { UserService } from '../../../services/user-service';




@Component({
  selector: 'app-delete-publisher',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,MatButtonModule,MatDialogTitle,MatDialogContent],
  templateUrl: './delete-publisher.component.html',
  styleUrl: './delete-publisher.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
  //changeDetection: ChangeDetectionStrategy.OnPush No cargan al principio las cosas, mejor quitar esto
})
export class DeletePublisherComponent implements OnInit{
  user!: Usuario;
 
  editorial!: Editorial;
  
  
  readonly dialogRef = inject(MatDialogRef<AdminPublishersComponent>);
  fromParentComponent: number;
    
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    
    private publisherService: EditorialService,
    
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
