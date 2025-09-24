import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { HeaderAdminComponent } from '../../../shared/headers/header-admin/header-admin.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../../services/book-service';
import { Libro } from '../../../../interfaces/libro';
import { Autor } from '../../../../interfaces/autor';
import { AuthorService } from '../../../../services/author-service';
import { EditorialService } from '../../../../services/editorial-service';
import { GenreService } from '../../../../services/genre-service';
import { Editorial } from '../../../../interfaces/editorial';
import { Genero } from '../../../../interfaces/genero';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { AuthorComponent } from '../../../../modals/author/author.component';
import { EditorialComponent } from '../../../../modals/editorial/editorial.component';
import { GenreComponent } from '../../../../modals/genre/genre.component';
import { Usuario } from '../../../../interfaces/usuario';
import { ServicesService } from '../../../../services/services.service';


@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,HeaderAdminComponent,MatButtonModule],
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush No cargan al principio las cosas, mejor quitar esto
})
export class UpdateBookComponent implements OnInit{
  user!: Usuario;
  // autores!: Autor[];
  // editoriales!: Editorial[];
  // generos!: Genero[];
  libro!: Libro;
  id!: string; //para recuperar luego id en url
    
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private userService: ServicesService,
    private router: Router
  ){}

  ngOnInit(): void {

       
    

   this.route.params.subscribe(params => {
      this.id = params['libro.id'];
    });
    this.retrieveFromLocalStorage();
    
    

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

  getCurrentBook(){
    let idLibro = parseInt(this.id)
    this.bookService.getBookById(idLibro).subscribe((data:Libro)=>{
      
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
        
        this.router.navigate(['/home']);
    })
    
    }
  
}
