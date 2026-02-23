import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

import { Genero } from '../../../interfaces/genero';
import { GenreService } from '../../../services/genre-service';

/**
 * Componente para eliminar el registro del genero
 */
@Component({
  selector: 'app-genre-delete',
  standalone: true,
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  templateUrl: './genre-delete.component.html',
  styleUrl: './genre-delete.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenreDeleteComponent implements OnInit {
  genre!: Genero;
  readonly dialogRef = inject(MatDialogRef<GenreDeleteComponent>);
  fromParentComponent: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private genreService: GenreService,
  ) {
    // Almacenamiento del id del genero del componente AdminGenresComponent
    this.fromParentComponent = data;
  }

  /**
   * Recuperacion de la informacion del genero al iniciar el componente
   */
  ngOnInit(): void {
      this.findCurrentGenre();
  }

  // Funcion para recuperar la informacion del genero
  findCurrentGenre() {
    this.genreService.getGenreById(this.data).subscribe((data: Genero) => {
      this.genre = data;
    });
  }

  // Funcion para eliminar el genero
  deleteGenre() {
    this.genreService.deleteGenre(this.genre.id).subscribe((data: any) => {
      // Si se realiza, devuelve true al cerrar para la actualizacion de la pagina
      this.dialogRef.close(true);
    });
  }

  // Funcion para cerrar el dialog
  closeDialog(): void {
    this.dialogRef.close();
  }

}