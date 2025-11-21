import { ChangeDetectionStrategy, Component, EventEmitter, Inject, inject, OnInit, Output } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';


import { UpdatePublisherComponent } from '../../editorial/update-publisher/update-publisher.component';
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
import { AdminGenresComponent } from '../../../pages/admin/admin-genres/admin-genres.component';
import { UserService } from '../../../services/user-service';




@Component({
  selector: 'app-delete-genre',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,MatButtonModule,MatDialogTitle,MatDialogContent],
  templateUrl: './delete-genre.component.html',
  styleUrl: './delete-genre.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
  //changeDetection: ChangeDetectionStrategy.OnPush No cargan al principio las cosas, mejor quitar esto
})
export class DeleteGenreComponent implements OnInit{
  user!: Usuario;
 
  genero!: Genero;
  
  
  readonly dialogRef = inject(MatDialogRef<AdminGenresComponent>);
  fromParentComponent: number;
    
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    
    private genreService: GenreService,
    
    private userService: UserService,
    
    private router: Router
  ){
    this.fromParentComponent = data;
  }

  ngOnInit(): void {

       
    

   
    this.retrieveFromLocalStorage();
    

   
      
      setTimeout(() => {
    this.findCurrentGenre();
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

  findCurrentGenre(){
    console.log(this.data)
    this.genreService.getGenreById(this.data).subscribe((data: Genero) => {
    
          this.genero = data;
          
    
        })
  }

  deleteGenre(){
    this.genreService.deleteGenre(this.genero.id).subscribe((data:any) =>{
        this.dialogRef.close(true);
        
    })
  }

  

  closeDialog(): void {
    this.dialogRef.close();
  }

  
    
  
}
