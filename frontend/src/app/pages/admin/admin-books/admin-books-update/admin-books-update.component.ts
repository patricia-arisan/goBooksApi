import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { HeaderAdminComponent } from '../../../shared/headers/header-admin/header-admin.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../../../../services/book-service';
import { Libro } from '../../../../interfaces/libro';
import { Autor } from '../../../../interfaces/autor';
import { AuthorService } from '../../../../services/author-service';

import { GenreService } from '../../../../services/genre-service';
import { Editorial } from '../../../../interfaces/editorial';
import { Genero } from '../../../../interfaces/genero';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

import { Usuario } from '../../../../interfaces/usuario';

import { AuthorUpdateComponent } from '../../../../modals/author/author-update/author-update.component';

import { GenreUpdateComponent } from '../../../../modals/genre/genre-update/genre-update.component';

import { UserService } from '../../../../services/user-service';
import { PublisherService } from '../../../../services/publisher-service';
import { PublisherUpdateComponent } from '../../../../modals/publisher/publisher-update/publisher-update.component';
import { BookDeleteComponent } from '../../../../modals/book/book-delete/book-delete.component';



@Component({
  selector: 'app-admin-books-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HeaderAdminComponent, MatButtonModule, RouterLink],
  templateUrl: './admin-books-update.component.html',
  styleUrl: './admin-books-update.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush No cargan al principio las cosas, mejor quitar esto
})
export class AdminBooksUpdateComponent implements OnInit {
  // user!: Usuario;
  libro!: Libro;
  id!: string; //para recuperar luego id en url
  url!: string;
  autores!: Autor[];
  editoriales!: Editorial[];
  generos!: Genero[];

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    // private userService: UserService,
    private authorService: AuthorService,
    private publisherService: PublisherService,
    private genreService: GenreService,
    private router: Router
  ) { }

  ngOnInit(): void {




    this.route.params.subscribe(params => {
      this.id = params['libro.id'];
    });
    // this.retrieveFromLocalStorage();
    this.getAuthors();
    this.getPublishers();
    this.getGenres();


    this.formUpdate = this.formBuilder.group({
      id: [null],
      // pattern para que no puedan ser todo espacios
      nombre: ["", [Validators.required,Validators.pattern(/^.*\S.*$/)]],
      autor: this.formBuilder.group({
        id: [null],
        nombre: ["", [Validators.required]]
      }),
      isbn: [""],
      editorial: this.formBuilder.group({
        id: [null],
        nombre: ["", [Validators.required]]
      }),
      genero: this.formBuilder.group({
        id: [null],
        nombre: ["", [Validators.required]]
      }),
      portada: [""],
      sinopsis: [""],
    })

    this.getCurrentBook();


    setTimeout(() => {
      this.fillForm();

    }, 500);
    // a veces falla??


  }

  // retrieveFromLocalStorage() {
  //           this.user = JSON.parse(localStorage.getItem('usuario') || '')

  //           let value = this.userService.getItem('id');

  //           let currentUser = 0;
  //           if(value!=null){
  //             currentUser = parseInt(value);

  //             this.userService.getLoggedUser(currentUser).subscribe((data:Usuario)=>{

  //               this.user = data;


  //             });
  //           }  
  //         }

  getCurrentBook() {
    let idLibro = parseInt(this.id)
    this.bookService.getBookById(idLibro).subscribe((data: Libro) => {

      this.libro = data;
      console.log(this.libro)

    })

  }



  fillForm() {

    this.formUpdate.patchValue({

      id: this.libro.id,
      nombre: this.libro.nombre,
      autor: {
        id: this.libro.autor.id,
        nombre: this.libro.autor.nombre,
      },
      isbn: this.libro.isbn,
      editorial: {
        id: this.libro.editorial.id,
        nombre: this.libro.editorial.nombre,
      },
      genero: {
        id: this.libro.genero.id,
        nombre: this.libro.genero.nombre,
      },
      portada: this.libro.portada,
      sinopsis: this.libro.sinopsis,



    });
    this.url = this.libro.portada;
  }

  formUpdate: FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl(""),
    autor: new FormGroup({
      id: new FormControl(null),
      nombre: new FormControl("")
    }),
    isbn: new FormControl(""),
    editorial: new FormGroup({
      id: new FormControl(null),
      nombre: new FormControl("")
    }),
    genero: new FormGroup({
      id: new FormControl(null),
      nombre: new FormControl("")
    }),
    portada: new FormControl(""),
    sinopsis: new FormControl(""),
  })

  update() {
    if (this.formUpdate.value.portada === "" || this.formUpdate.value.portada === null) {
      this.formUpdate.patchValue({
        portada: "/assets/icons/book.png",

      })
    }
    this.bookService.updateBook(this.libro.id, this.formUpdate.value).subscribe({
      next: (data: Libro) => {
        console.log(data);
        this.router.navigate(['/admin-books']);
      }, error: (errorRes) => {
        const errorCode = errorRes.error?.codigo;

        if (errorCode === "00000013") {
          this.formUpdate.setErrors({ foundBook: true })
        }else if (errorCode === "00000014") {
          this.formUpdate.setErrors({ foundIsbn: true })
        } 



      }
    });

  }

  getAuthors() {
    this.authorService.getAuthorsByNameOrder().subscribe((data: Autor[]) => {
      this.autores = data;
    })

  }



  getPublishers() {
    this.publisherService.getPublishersByNameOrder().subscribe((data: Editorial[]) => {
      this.editoriales = data;
    })

  }

  getGenres() {
    this.genreService.getGenresByNameOrder().subscribe((data: Genero[]) => {
      this.generos = data;
    })

  }

  sendImage(event: Event) {
    let selectedUrl = (event.target as HTMLInputElement)!.value;
    console.log(selectedUrl);
    console.log(this.url)
    this.url = selectedUrl;


    if (this.url === null || this.url.trim().length === 0) {

      this.url = "/assets/icons/book.png";

    }
  }



  readonly dialog = inject(MatDialog);

  openUpdateAuthorDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AuthorUpdateComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: this.libro.autor.id
    }).afterClosed().subscribe((data: Libro) => {
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
      data: this.libro.editorial.id
    }).afterClosed().subscribe((data: Libro) => {
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
      data: this.libro.genero.id
    }).afterClosed().subscribe((data: Libro) => {
      this.generos.push(data);




      this.getGenres();
    });
  }

  openDeleteBookDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(BookDeleteComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: this.libro.id
    })
  }

  get nombre() {
    return this.formUpdate.get('nombre')!;
  }


}
