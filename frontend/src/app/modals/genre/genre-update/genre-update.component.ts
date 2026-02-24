import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

import { GenreService } from '../../../services/genre-service';
import { Genero } from '../../../interfaces/genero';

/**
 * Componente para actualizar genero
 */
@Component({
  selector: 'app-genre-update',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogTitle, MatDialogContent, FormsModule, ReactiveFormsModule],
  templateUrl: './genre-update.component.html',
  styleUrl: './genre-update.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenreUpdateComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<GenreUpdateComponent>);
  fromParentComponent: number;
  genre!: Genero;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private formBuilder: FormBuilder,
    private genreService: GenreService,
  ) {
    /**
     * Almacenamiento del id de genero que puede venir del componente AdminGenresComponent,
     * BookUpdateComponent o AdminBooksUpdateComponent
     */
    this.fromParentComponent = data;
  }

  /**
   * Definicion de estructura y validaciones del formulario al iniciar el componente
   * Recuperacion del genero y rellenado de formulario
   */
  ngOnInit(): void {
    this.formUpdateGenre = this.formBuilder.group({
      id: [null],
      nombre: ["", [Validators.required, Validators.pattern(/^.*\S.*$/)]]
    });

    this.findCurrentGenre();
  }

  // Funcion para recuperar la informacion del genero a actualizar y enviarla al formulario
  findCurrentGenre() {
    this.genreService.getGenreById(this.data).subscribe((data: Genero) => {
      this.genre = data;
      this.fillForm();
    });
  }

  // Funcion para rellenar los datos del genero
  fillForm() {
    this.formUpdateGenre.patchValue({
      id: this.genre.id,
      nombre: this.genre.nombre,
    });
  }

  // Inicializacion del formulario
  formUpdateGenre: FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl(""),
  })

  // Funcion para actualizar el genero
  updateGenre() {
    // Envio de los datos del formulario al servicio de genero
    this.genreService.updateGenre(this.genre.id, this.formUpdateGenre.value).subscribe({
      next: (data: Genero) => {
        // Almacenamiento de los datos y cierre del dialog
        this.dialogRef.close(data);
      }, error: (error) => {
        if (error) {
          // Si se encuentra un genero con el mismo nombre, se lanza un error
          this.formUpdateGenre.setErrors({foundGenre: true});
        }
      }
    });
  }

  // Getter para acceder desde HTML al control del formulario
  get name() {
    return this.formUpdateGenre.get('nombre')!;
  }

  // Funcion para cerrar el dialog
  closeForm(): void {
    this.dialogRef.close();
  }

}