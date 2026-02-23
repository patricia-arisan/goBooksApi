import { Component, Inject, inject, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

import { AuthorUpdateComponent } from '../../author/author-update/author-update.component';
import { PublisherUpdateComponent } from '../../publisher/publisher-update/publisher-update.component';
import { GenreUpdateComponent } from '../../genre/genre-update/genre-update.component';

import { Libro } from '../../../interfaces/libro';
import { Autor } from '../../../interfaces/autor';
import { Editorial } from '../../../interfaces/editorial';
import { Genero } from '../../../interfaces/genero';
import { BookService } from '../../../services/book-service';
import { AuthorService } from '../../../services/author-service';
import { GenreService } from '../../../services/genre-service';
import { PublisherService } from '../../../services/publisher-service';

/**
 * Componente para actualizacion rapida de algunos elementos del libro
 */
@Component({
  selector: 'app-book-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  templateUrl: './book-update.component.html',
  styleUrl: './book-update.component.css',
})
export class BookUpdateComponent implements OnInit {
  book!: Libro;
  authors!: Autor[];
  publishers!: Editorial[];
  genres!: Genero[];
  readonly dialogRef = inject(MatDialogRef<BookUpdateComponent>);
  fromParentComponent: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    private publisherService: PublisherService,
    private genreService: GenreService,
  ) {
    // Almacenamiento del id del libro del componente AdminBooksComponent
    this.fromParentComponent = data;
  }

  /**
   * Recuperacion del libro, autores, editoriales y generos al iniciar el componente
   * Definicion de estructura y validaciones del formulario y rellenado
   */
  ngOnInit(): void {
    this.getAuthors();
    this.getPublishers();
    this.getGenres();
    this.getCurrentBook();

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
    });    

    setTimeout(() => {
      this.fillForm();
    }, 900);
  }  

  // Funcion para recuperar la informacion del libro
  getCurrentBook() {
    this.bookService.getBookById(this.data).subscribe((data: Libro) => {
      this.book = data;
    });
  }

  // Funcion para rellenar el formulario
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

  // Funcion para actualizar el libro
  update() {
    // Envio de los datos del formulario al servicio de libro
    this.bookService.updateBook(this.book.id, this.formUpdate.value).subscribe({
      next: (data: Libro) => {
        // Almacenamiento de los datos y cierre del dialog
        this.dialogRef.close(data);
      }, error: (errorRes) => {
        const errorCode = errorRes.error?.codigo;
        if (errorCode === "00000013") {
          // Comprobacion de la existencia del libro
          this.formUpdate.setErrors({foundBook: true});
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

  // Getter para acceder desde HTML a los controles del formulario
  get name() {
    return this.formUpdate.get('nombre')!;
  }

  // Funcion para cerrar el dialog
  closeForm(): void {
    this.dialogRef.close();
  }  

}