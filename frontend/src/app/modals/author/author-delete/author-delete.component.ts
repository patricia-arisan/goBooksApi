import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

import { Autor } from '../../../interfaces/autor';
import { AuthorService } from '../../../services/author-service';

/**
 * Componente para eliminar el registro del autor
 */
@Component({
  selector: 'app-author-delete',
  standalone: true,
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  templateUrl: './author-delete.component.html',
  styleUrl: './author-delete.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorDeleteComponent implements OnInit {
  author!: Autor;
  readonly dialogRef = inject(MatDialogRef<AuthorDeleteComponent>);
  fromParentComponent: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private authorService: AuthorService,
  ) {
    // Almacenamiento del id del libro del componente AdminAuthorsComponent
    this.fromParentComponent = data;
  }

  /**
   * Recuperacion de la informacion del autor al iniciar el componente
   */
  ngOnInit(): void {
      this.findCurrentAuthor();
  }
  
  // Funcion para recuperar la informacion del autor
  findCurrentAuthor() {
    this.authorService.getAuthorById(this.data).subscribe((data: Autor) => {
      this.author = data;
    });
  }

  // Funcion para eliminar el autor
  deleteAuthor() {
    this.authorService.deleteAuthor(this.author.id).subscribe((data: any) => {
      // Si se realiza, devuelve true al cerrar para la actualizacion de la pagina
      this.dialogRef.close(true);
    });
  }

  // Funcion para cerrar el dialog
  closeDialog(): void {
    this.dialogRef.close();
  }

}