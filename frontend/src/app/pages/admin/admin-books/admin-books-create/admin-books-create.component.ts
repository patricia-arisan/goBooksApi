import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
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
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

import { PublisherService } from '../../../../services/publisher-service';
import { AuthorCreateComponent } from '../../../../modals/author/author-create/author-create.component';
import { PublisherCreateComponent } from '../../../../modals/publisher/publisher-create/publisher-create.component';
import { GenreCreateComponent } from '../../../../modals/genre/genre-create/genre-create.component';

@Component({
  selector: 'app-admin-books-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HeaderAdminComponent, MatButtonModule, RouterLink],
  templateUrl: './admin-books-create.component.html',
  styleUrl: './admin-books-create.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush No cargan al principio las cosas, mejor quitar esto
})
export class AdminBooksCreateComponent implements OnInit {
  autores!: Autor[];
  editoriales!: Editorial[];
  generos!: Genero[];
  url: string = "/assets/icons/book.png";

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    private publisherService: PublisherService,
    private genreService: GenreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAuthors();
    this.getPublishers();
    this.getGenres();

    this.formNewBook = this.formBuilder.group({
      id: [null],
      nombre: ["", [Validators.required,Validators.pattern(/^.*\S.*$/)]],
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

  fillForm() {
    this.formNewBook.patchValue({
      portada: this.url,

    })
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

  ////////////////////////
  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AuthorCreateComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
    }).afterClosed().subscribe((data: Autor) => {
      this.autores.push(data);
      console.log(this.autores)
      this.getAuthors();
    });
  }

  openEditorialDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(PublisherCreateComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
    }).afterClosed().subscribe((data: Editorial) => {
      this.editoriales.push(data);
      console.log(this.editoriales)
      this.getPublishers();
    });
  }

  openGenreDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(GenreCreateComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
    }).afterClosed().subscribe((data: Genero) => {
      this.generos.push(data);
      console.log(this.generos)
      this.getGenres();
    });
  }

  /////////////////////////




  registerBook() {
    if (this.formNewBook.value.portada === "" || this.formNewBook.value.portada === null) {
      this.fillForm();
    }
    this.bookService.createBook(this.formNewBook.value).subscribe({
      next: (data: Libro) => {
        console.log(data);
        this.router.navigate(['/admin-books']);
      }, error: (errorRes) => {
        const errorCode = errorRes.error?.codigo;

        if (errorCode === "00000013") {
          this.formNewBook.setErrors({ foundBook: true })
        } else if (errorCode === "00000014") {
          this.formNewBook.setErrors({ foundIsbn: true })
        }



      }
    });
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
  get nombre() {
    return this.formNewBook.get('nombre')!;
  }

  get idEditorial() {
    return this.formNewBook.get('editorial.id')!;
  }
  get idAutor() {
    return this.formNewBook.get('autor.id')!;
  }
  get idGenero() {
    return this.formNewBook.get('genero.id')!;
  }



}
