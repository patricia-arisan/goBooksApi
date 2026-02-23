import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

import { Libro } from '../../../interfaces/libro';
import { BookService } from '../../../services/book-service';

/**
 * Componente para eliminar el registro del libro
 */
@Component({
  selector: 'app-book-delete',
  standalone: true,
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  templateUrl: './book-delete.component.html',
  styleUrl: './book-delete.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDeleteComponent implements OnInit {
  book!: Libro;
  readonly dialogRef = inject(MatDialogRef<BookDeleteComponent>);
  fromParentComponent: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private bookService: BookService,
    private router: Router
  ) {
    // Almacenamiento del id del libro del componente AdminBooksUpdateComponent
    this.fromParentComponent = data;
  }
  /**
   * Recuperacion de la informacion del libro al iniciar el componente
   */
  ngOnInit(): void {
    this.getCurrentBook();
  }  

  // Funcion para recuperar el libro con el id del componente padre
  getCurrentBook() {
    this.bookService.getBookById(this.data).subscribe((data: Libro) => {
      this.book = data;
    });
  }

  // Funcion para eliminar el libro
  deleteBook() {
    this.bookService.deleteBook(this.book.id).subscribe((data: any) => {
      this.dialogRef.close();
      // Retorno a la pagina de administar libros al desaparecer la del libro eliminado
      this.router.navigate(['/admin-books']);
    });
  }

  // Funcion para cerrar el dialog
  closeDialog(): void {
    this.dialogRef.close();
  }

}