import { ChangeDetectionStrategy, Component, EventEmitter, Inject, inject, OnInit, Output } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

import { Usuario } from '../../../interfaces/usuario';

import { HeaderAdminComponent } from '../../../pages/shared/headers/header-admin/header-admin.component';
import { Libro } from '../../../interfaces/libro';
import { BookService } from '../../../services/book-service';

import { AdminBooksComponent } from '../../../pages/admin/admin-books/admin-books.component';
import { UpdateBookComponent } from '../../../pages/admin/admin-books/update-book/update-book.component';
import { UserService } from '../../../services/user-service';




@Component({
  selector: 'app-delete-book',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,MatButtonModule,MatDialogTitle,MatDialogContent],
  templateUrl: './delete-book.component.html',
  styleUrl: './delete-book.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
  //changeDetection: ChangeDetectionStrategy.OnPush No cargan al principio las cosas, mejor quitar esto
})
export class DeleteBookComponent implements OnInit{
  user!: Usuario;
 
  libro!: Libro;
  
  
  readonly dialogRef = inject(MatDialogRef<UpdateBookComponent>);
  fromParentComponent: number;
    
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    
    private bookService: BookService,
    
    private userService: UserService,
    
    private router: Router
  ){
    this.fromParentComponent = data;
  }

  ngOnInit(): void {

       
    

   
    this.retrieveFromLocalStorage();
    

   
      
      this.getCurrentBook();
       
      
    

     
    
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

  getCurrentBook(){
    console.log(this.data)
    this.bookService.getBookById(this.data).subscribe((data:Libro)=>{
      
          this.libro = data;
          console.log(this.libro)
          
        })
        
  }

  deleteBook(){
    this.bookService.deleteBook(this.libro.id).subscribe((data:any) =>{
        this.dialogRef.close();
        this.router.navigate(['/admin-books']);
    })
  }

  

  closeDialog(): void {
    this.dialogRef.close();
  }

  
    
  
}
