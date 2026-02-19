import { Component, inject, OnInit } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';

import { AuthorUpdateComponent } from '../../../../modals/author/author-update/author-update.component';

import { GenreUpdateComponent } from '../../../../modals/genre/genre-update/genre-update.component';

import { PublisherService } from '../../../../services/publisher-service';
import { PublisherUpdateComponent } from '../../../../modals/publisher/publisher-update/publisher-update.component';
import { BookDeleteComponent } from '../../../../modals/book/book-delete/book-delete.component';

/**
 * Componente de Editar libro
 */
@Component({
  selector: 'app-admin-books-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HeaderAdminComponent, MatButtonModule, RouterLink],
  templateUrl: './admin-books-update.component.html',
  styleUrl: './admin-books-update.component.css',
})
export class AdminBooksUpdateComponent implements OnInit {
  authors!: Autor[];
  publishers!: Editorial[];
  genres!: Genero[];
  book!: Libro;
  id!: string; 
  url!: string;
  

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private publisherService: PublisherService,
    private genreService: GenreService,
    private router: Router
  ) {}

  /**
   * Recuperacion del libro, autores, editoriales y generos al iniciar el componente
   * Definicion de estructura y validaciones del formulario y rellenado
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['libro.id'];
    });
    this.getAuthors();
    this.getPublishers();
    this.getGenres();

    this.formUpdate = this.formBuilder.group({
      id: [null],
      nombre: ["", [Validators.required, Validators.pattern(/^.*\S.*$/)]],
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
  }

  // Funcion para recuperar la informacion del libro actual
  getCurrentBook() {
    // Recuperacion del id obtenido de los parametros de la url para buscar el libro con el servicio
    let idLibro = parseInt(this.id)
    this.bookService.getBookById(idLibro).subscribe((data: Libro) => {
      this.book = data;
    });
  }

  // Inicializacion del formulario
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

    //Funcion para rellenar los datos del libro en el formulario
    fillForm() {
    this.formUpdate.patchValue({
      id: this.book.id,
      nombre: this.book.nombre,
      autor: {
        id: this.book.autor.id,
        nombre: this.book.autor.nombre,
      },
      isbn: this.book.isbn,
      editorial: {
        id: this.book.editorial.id,
        nombre: this.book.editorial.nombre,
      },
      genero: {
        id: this.book.genero.id,
        nombre: this.book.genero.nombre,
      },
      portada: this.book.portada,
      sinopsis: this.book.sinopsis,
    });
    // Rellenado de la previsualizacion de la imagen de portada
    this.url = this.book.portada;
  }

  // Funcion para actualizar el libro
  update() {
    // Condicion por la que se rellena la portada con imagen por defecto si se vacia
    if (this.formUpdate.value.portada === "" || this.formUpdate.value.portada === null) {
      this.formUpdate.patchValue({
        portada: "/assets/icons/book.png"
      });
    }
    // Envio de los datos del formulario al servicio de libro
    this.bookService.updateBook(this.book.id, this.formUpdate.value).subscribe({
      next: (data: Libro) => {
        this.router.navigate(['/admin-books']);
      }, error: (errorRes) => {
        const errorCode = errorRes.error?.codigo;        
        if (errorCode === "00000013") {
          // Comprobacion de la existencia del libro
          this.formUpdate.setErrors({foundBook: true});
        } else if (errorCode === "00000014") {
          // Comprobacion de la existencia del ISBN
          this.formUpdate.setErrors({foundIsbn: true});
        }
      }
    });
  }

  // Funcion para listar autores por orden alfabetico
  getAuthors() {
    this.authorService.getAuthorsByNameOrder().subscribe((data: Autor[]) => {
      this.authors = data;
    });
  }

  // Funcion para listar editoriales por orden alfabetico
  getPublishers() {
    this.publisherService.getPublishersByNameOrder().subscribe((data: Editorial[]) => {
      this.publishers = data;
    });
  }

  // Funcion para listar generos por orden alfabetico
  getGenres() {
    this.genreService.getGenresByNameOrder().subscribe((data: Genero[]) => {
      this.genres = data;
    });
  }

  // Funcion para cambiar la portada por inicial por la introducida por el administrador o por defecto
  sendImage(event: Event) {
    let selectedUrl = (event.target as HTMLInputElement)!.value;
    this.url = selectedUrl;

    // Comprobacion de si esta vacio o con espacios el campo de la portada
    if (this.url === null || this.url.trim().length === 0) {
      this.url = "/assets/icons/book.png";
    }
  }

  // Inyeccion de dependencias para usar MatDialog
  readonly dialog = inject(MatDialog);

  // Funcion para abrir el componente para actualizar el autor
  openUpdateAuthorDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AuthorUpdateComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: this.book.autor.id
    }).afterClosed().subscribe((data: Libro) => {
      this.authors.push(data);
      this.getAuthors();
    });
  }

  // Funcion para abrir el componente para actualizar la editorial
  openUpdatePublisherDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(PublisherUpdateComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: this.book.editorial.id
    }).afterClosed().subscribe((data: Libro) => {
      this.publishers.push(data);
      this.getPublishers();
    });
  }

  // Funcion para abrir el componente para actualizar el genero
  openUpdateGenreDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(GenreUpdateComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: this.book.genero.id
    }).afterClosed().subscribe((data: Libro) => {
      this.genres.push(data);
      this.getGenres();
    });
  }

  // Funcion para abrir el componente para eliminar el libro
  openDeleteBookDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(BookDeleteComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: this.book.id
    });
  }

  // Getter para acceder desde HTML a los controles del formulario
  get name() {
    return this.formUpdate.get('nombre')!;
  }

}