import { Component, inject, OnInit } from '@angular/core';
import { HeaderAdminComponent } from '../../../shared/headers/header-admin/header-admin.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BookService } from '../../../../services/book-service';
import { Libro } from '../../../../interfaces/libro';
import { Autor } from '../../../../interfaces/autor';
import { AuthorService } from '../../../../services/author-service';

import { GenreService } from '../../../../services/genre-service';
import { Editorial } from '../../../../interfaces/editorial';
import { Genero } from '../../../../interfaces/genero';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { PublisherService } from '../../../../services/publisher-service';
import { AuthorCreateComponent } from '../../../../modals/author/author-create/author-create.component';
import { PublisherCreateComponent } from '../../../../modals/publisher/publisher-create/publisher-create.component';
import { GenreCreateComponent } from '../../../../modals/genre/genre-create/genre-create.component';

/**
 * Componente de Crear libro
 */
@Component({
  selector: 'app-admin-books-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HeaderAdminComponent, MatButtonModule, RouterLink],
  templateUrl: './admin-books-create.component.html',
  styleUrl: './admin-books-create.component.css',
})
export class AdminBooksCreateComponent implements OnInit {
  authors!: Autor[];
  publishers!: Editorial[];
  genres!: Genero[];
  url: string = "/assets/icons/book.png";

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    private publisherService: PublisherService,
    private genreService: GenreService,
    private router: Router
  ) {}

  /**
   * Recuperacion de los listados de autores, editoriales y generos para los selects al iniciar el componente
   * Definicion de estructura y validaciones del formulario
   */
  ngOnInit(): void {
    this.getAuthors();
    this.getPublishers();
    this.getGenres();

    this.formNewBook = this.formBuilder.group({
      id: [null],
      nombre: ["", [Validators.required, Validators.pattern(/^.*\S.*$/)]],
      autor: this.formBuilder.group({
        id: [null, [Validators.required]],
        nombre: [""]
      }),
      isbn: [""],
      editorial: this.formBuilder.group({
        id: [null, [Validators.required]],
        nombre: [""]
      }),
      portada: [""],
      genero: this.formBuilder.group({
        id: [null, [Validators.required]],
        nombre: [""]
      }),
      sinopsis: [""]
    });
  }

  // Inicializacion del formulario
  formNewBook: FormGroup = new FormGroup({
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
    portada: new FormControl(""),
    genero: new FormGroup({
      id: new FormControl(null),
      nombre: new FormControl("")
    }),
    sinopsis: new FormControl("")
  })

  // Funcion para rellenar temporalmente la portada con una imagen por defecto
  fillForm() {
    this.formNewBook.patchValue({
      portada: this.url,
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

  // Inyeccion de dependencias para usar MatDialog
  readonly dialog = inject(MatDialog);

  // Funcion para abrir el componente crear un nuevo autor
  openAuthorDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AuthorCreateComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
    }).afterClosed().subscribe((data: Autor) => {
      // Se agrega el nuevo registro a la lista
      this.authors.push(data);
      this.getAuthors();
    });
  }

  // Funcion para abrir el componente crear una nueva editorial
  openPublisherDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(PublisherCreateComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
    }).afterClosed().subscribe((data: Editorial) => {
      // Se agrega el nuevo registro a la lista
      this.publishers.push(data);
      this.getPublishers();
    });
  }

  // Funcion para abrir el componente crear un nuevo genero
  openGenreDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(GenreCreateComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
    }).afterClosed().subscribe((data: Genero) => {
      // Se agrega el nuevo registro a la lista
      this.genres.push(data);
      this.getGenres();
    });
  }

  // Funcion para guardar el nuevo libro
  registerBook() {
    // Condicion con la que se rellena la imagen de la portada si viene vacia
    if (this.formNewBook.value.portada === "" || this.formNewBook.value.portada === null) {
      this.fillForm();
    }
    // Envio de los datos del formulario al servicio de libro
    this.bookService.createBook(this.formNewBook.value).subscribe({
      next: (data: Libro) => {
        this.router.navigate(['/admin-books']);
      }, error: (errorRes) => {
        const errorCode = errorRes.error?.codigo;
        if (errorCode === "00000013") {
          // Comprobacion de la existencia del libro
          this.formNewBook.setErrors({foundBook: true});
        } else if (errorCode === "00000014") {
          // Comprobacion de la existencia del ISBN
          this.formNewBook.setErrors({foundIsbn: true});
        }
      }
    });
  }

  // Funcion para cambiar la portada por defecto por la introducida por el administrador
  sendImage(event: Event) {
    let selectedUrl = (event.target as HTMLInputElement)!.value;
    this.url = selectedUrl;

    // Comprobacion de si esta vacio o con espacios el campo de la portada
    if (this.url === null || this.url.trim().length === 0) {
      this.url = "/assets/icons/book.png";
    }
  }

  // Getters para acceder desde HTML a los controles del formulario de nombre, autor, editorial y genero
  get name() {
    return this.formNewBook.get('nombre')!;
  }

  get idPublisher() {
    return this.formNewBook.get('editorial.id')!;
  }
  get idAuthor() {
    return this.formNewBook.get('autor.id')!;
  }
  get idGenre() {
    return this.formNewBook.get('genero.id')!;
  }

}