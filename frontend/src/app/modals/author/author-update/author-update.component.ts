import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthorService } from '../../../services/author-service';
import { Autor } from '../../../interfaces/autor';

import { Libro } from '../../../interfaces/libro';
import { BookService } from '../../../services/book-service';
import { Usuario } from '../../../interfaces/usuario';
import { UserService } from '../../../services/user-service';
import { AdminBooksUpdateComponent } from '../../../pages/admin/admin-books/admin-books-update/admin-books-update.component';


@Component({
  selector: 'app-author-update',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogTitle, MatDialogContent,FormsModule, ReactiveFormsModule],
  templateUrl: './author-update.component.html',
  styleUrl: './author-update.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorUpdateComponent implements OnInit{
  user!: Usuario;
  libro!: Libro;
  readonly dialogRef = inject(MatDialogRef<AdminBooksUpdateComponent>);
  fromParentComponent: number;
  autor!: Autor;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private authorService: AuthorService,
    private bookService: BookService,
    private userService: UserService,
  ){
    this.fromParentComponent = data;
  }

  ngOnInit(): void {
    this.retrieveFromLocalStorage();

    this.formUpdateAuthor = this.formBuilder.group ({
       id:[null],
        nombre:["",[Validators.required,Validators.pattern(/^.*\S.*$/)]],
        
    });
    
    // this.getCurrentBook();
setTimeout(() => {
    this.findCurrentAuthor();
    }, 500);
    setTimeout(() => {
    this.fillForm();
      }, 600);
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

  // getCurrentBook(){
    
  //   this.bookService.getBookById(this.data).subscribe((data:Libro)=>{
      
  //         this.libro = data;
  //         console.log(this.libro)
          
  //       })
        
  // }

  findCurrentAuthor(){
    console.log(this.data)
    this.authorService.getAuthorById(this.data).subscribe((data: Autor) => {
    
          this.autor = data;
          console.log(this.autor)
    
        })
  }

  fillForm(){
    
        this.formUpdateAuthor.patchValue({
          
            id: this.autor.id,
          nombre:this.autor.nombre,
          
        
    });
      
   }

  formUpdateAuthor:FormGroup = new FormGroup({
    id: new FormControl(null),
      nombre: new FormControl(""),
    
  })
  

  updateAuthor(){
    this.authorService.updateAuthor(this.autor.id,this.formUpdateAuthor.value).subscribe({next:(data:Autor) =>{
      console.log(data);
        this.dialogRef.close(data);
        
        }, error: (error)=> {
      if(error){
        this.formUpdateAuthor.setErrors({foundAuthor: true})
      }
        }
    });
    }

    get nombre(){
    return this.formUpdateAuthor.get('nombre')!;
  }  
  closeForm(): void {
    this.dialogRef.close();
  }
}
