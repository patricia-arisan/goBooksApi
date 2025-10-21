import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthorService } from '../../../services/author-service';
import { Autor } from '../../../interfaces/autor';
import { UpdateBookComponent } from '../../../pages/admin/admin-books/update-book/update-book.component';
import { Libro } from '../../../interfaces/libro';
import { BookService } from '../../../services/book-service';
import { Usuario } from '../../../interfaces/usuario';
import { ServicesService } from '../../../services/services.service';

@Component({
  selector: 'app-author-update',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,FormsModule, ReactiveFormsModule],
  templateUrl: './author-update.component.html',
  styleUrl: './author-update.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorUpdateComponent implements OnInit{
  user!: Usuario;
  libro!: Libro;
  readonly dialogRef = inject(MatDialogRef<UpdateBookComponent>);
  fromParentComponent: number;
  autor!: Autor;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private authorService: AuthorService,
    private bookService: BookService,
    private userService: ServicesService,
  ){
    this.fromParentComponent = data;
  }

  ngOnInit(): void {
    this.retrieveFromLocalStorage();

    this.formUpdateAuthor = this.formBuilder.group ({
       id:[null],
        nombre:[""],
        // autor:this.formBuilder.group({
        //   id:[null],
        //   nombre:[""]
        // }),
        // isbn:[""],
        // editorial:this.formBuilder.group({
        //   id:[null],
        //   nombre:[""]
        // }),
        // genero:this.formBuilder.group({
        //   id:[null],
        //   nombre:[""]
        // }),
        // portada:[""],
        // sinopsis:[""],
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
        // autor:{
        //   id: this.libro.autor.id,
        //   nombre:this.libro.autor.nombre,
        // },
        // isbn:this.libro.isbn,
        // editorial:{
        //   id: this.libro.editorial.id,
        //   nombre:this.libro.editorial.nombre,
        // },
        // genero:{
        //   id: this.libro.genero.id,
        //   nombre:this.libro.genero.nombre,
        // },
        // portada:this.libro.portada,
        // sinopsis:this.libro.sinopsis,
          
          
        
    });
      
   }

  formUpdateAuthor:FormGroup = new FormGroup({
    id: new FormControl(null),
      nombre: new FormControl(""),
      // autor: new FormGroup({
      //   id: new FormControl(null),
      //   nombre: new FormControl("")
      // }),
      // isbn: new FormControl(""),
      // editorial:new FormGroup({
      //   id: new FormControl(null),
      //   nombre: new FormControl("")
      // }),
      // genero:new FormGroup({
      //   id: new FormControl(null),
      //   nombre: new FormControl("")
      // }),
      // portada:new FormControl(""),
      //  sinopsis:new FormControl(""),
    
  })
  

  updateAuthor(){
    this.authorService.updateAuthor(this.autor.id,this.formUpdateAuthor.value).subscribe((data:Autor) =>{
      console.log(data);
        this.dialogRef.close(data);
        
        })
    }
  closeForm(): void {
    this.dialogRef.close();
  }
}
