import { ChangeDetectionStrategy, Component, EventEmitter, Inject, inject, OnInit, Output } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

import { AuthorUpdateComponent } from '../../author/author-update/author-update.component';

import { GenreUpdateComponent } from '../../genre/genre-update/genre-update.component';
import { Usuario } from '../../../interfaces/usuario';

import { HeaderAdminComponent } from '../../../pages/shared/headers/header-admin/header-admin.component';
import { Libro } from '../../../interfaces/libro';
import { Autor } from '../../../interfaces/autor';
import { Editorial } from '../../../interfaces/editorial';
import { Genero } from '../../../interfaces/genero';
import { BookService } from '../../../services/book-service';
import { AuthorService } from '../../../services/author-service';

import { GenreService } from '../../../services/genre-service';
import { AdminBooksComponent } from '../../../pages/admin/admin-books/admin-books.component';
import { UserService } from '../../../services/user-service';
import { PublisherService } from '../../../services/publisher-service';
import { PublisherUpdateComponent } from '../../publisher/publisher-update/publisher-update.component';





@Component({
  selector: 'app-book-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,MatButtonModule,MatDialogTitle,MatDialogContent,MatDialogActions],
  templateUrl: './book-update.component.html',
  styleUrl: './book-update.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush
  //changeDetection: ChangeDetectionStrategy.OnPush No cargan al principio las cosas, mejor quitar esto
})
export class BookUpdateComponent implements OnInit{
  user!: Usuario;
  // autores!: Autor[];
  // editoriales!: Editorial[];
  // generos!: Genero[];
  libro!: Libro;
  
  url!: string;
  autores!: Autor[];
  editoriales!: Editorial[];
  generos!: Genero[];
  readonly dialogRef = inject(MatDialogRef<AdminBooksComponent>);
  fromParentComponent: number;
    
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private bookService: BookService,
    
    private userService: UserService,
    private authorService: AuthorService,
    private publisherService: PublisherService,
    private genreService: GenreService,
    private router: Router
  ){
    this.fromParentComponent = data;
  }

  ngOnInit(): void {

       
    

   
    this.retrieveFromLocalStorage();
     this.getAuthors();
    this.getPublishers();
    this.getGenres();
    

    this.formUpdate = this.formBuilder.group ({
        id:[null],
        nombre:[""],
        autor:this.formBuilder.group({
          id:[null],
          nombre:["",[Validators.required]]
        }),
        isbn:[""],
        editorial:this.formBuilder.group({
          id:[null],
          nombre:["",[Validators.required]]
        }),
        genero:this.formBuilder.group({
          id:[null],
          nombre:["",[Validators.required]]
        }),
        portada:[""],
        sinopsis:[""],
        
      })
      
      this.getCurrentBook();
       
      
    setTimeout(() => {
      this.fillForm();
      
    }, 900);

     
    
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

  fillForm(){
    
        this.formUpdate.patchValue({
          
            id: this.libro.id,
          nombre:this.libro.nombre,
        autor:{
          id: this.libro.autor.id,
          nombre:this.libro.autor.nombre,
        },
        isbn:this.libro.isbn,
        editorial:{
          id: this.libro.editorial.id,
          nombre:this.libro.editorial.nombre,
        },
        genero:{
          id: this.libro.genero.id,
          nombre:this.libro.genero.nombre,
        },
        portada:this.libro.portada,
        sinopsis:this.libro.sinopsis,
       
    });
      
   }

    formUpdate:FormGroup = new FormGroup({
      id: new FormControl(null),
      nombre: new FormControl(""),
      autor: new FormGroup({
        id: new FormControl(null),
        nombre: new FormControl("")
      }),
      isbn: new FormControl(""),
      editorial:new FormGroup({
        id: new FormControl(null),
        nombre: new FormControl("")
      }),
      genero:new FormGroup({
        id: new FormControl(null),
        nombre: new FormControl("")
      }),
      portada:new FormControl(""),
       sinopsis:new FormControl(""),
      
    })

    update(){
      this.bookService.updateBook(this.libro.id,this.formUpdate.value).subscribe((data:Libro) =>{
        
        this.dialogRef.close(data);
    })
    
    }

    getAuthors(){
    this.authorService.getAuthorsByNameOrder().subscribe((data:Autor[])=>{
        this.autores = data;
      })

    }

    

    getPublishers(){
    this.publisherService.getPublishersByNameOrder().subscribe((data:Editorial[])=>{
        this.editoriales = data;
      })

    }

    getGenres(){
    this.genreService.getGenresByNameOrder().subscribe((data:Genero[])=>{
        this.generos = data;
      })

    }

    sendImage(event: Event){
      let selectedUrl = (event.target as HTMLInputElement)!.value;
      console.log(selectedUrl);
      console.log(this.url)
      this.url=selectedUrl;
      
      
        if(this.url===null || this.url.trim().length === 0) {
        
        this.url="/assets/icon/book.png";
        
      }
    }

    

    readonly dialog = inject(MatDialog);
    
    openUpdateAuthorDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AuthorUpdateComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data:this.libro.autor.id
    }).afterClosed().subscribe((data: Libro)=>{
      this.autores.push(data);
     

      
      console.log(this.autores)
      this.getAuthors();
    });
  }
  
  openUpdatePublisherDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(PublisherUpdateComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data:this.libro.editorial.id
    }).afterClosed().subscribe((data: Libro)=>{
      this.editoriales.push(data);
     

      
      
      this.getPublishers();
    });
  }

   openUpdateGenreDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(GenreUpdateComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data:this.libro.genero.id
    }).afterClosed().subscribe((data: Libro)=>{
      this.generos.push(data);
     

      
      
      this.getGenres();
    });
  }

  closeForm(): void {
    this.dialogRef.close();
  }

  
    
  
}
