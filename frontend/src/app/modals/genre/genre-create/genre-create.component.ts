import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { GenreService } from '../../../services/genre-service';
import { Genero } from '../../../interfaces/genero';

/**
 * Componente para crear genero
 */
@Component({
  selector: 'app-genre-create',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogTitle, MatDialogContent, FormsModule, ReactiveFormsModule],
  templateUrl: './genre-create.component.html',
  styleUrl: './genre-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenreCreateComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<GenreCreateComponent>);

  constructor(
    private formBuilder: FormBuilder,
    private genreService: GenreService,
  ) {}

  /**
   * Definicion de estructura y validaciones del formulario al iniciar el componente
   */
  ngOnInit(): void {
    this.formNewGenre = this.formBuilder.group({
      id: [null],
      nombre: ["", [Validators.required, Validators.pattern(/^.*\S.*$/)]]
    });
  }

  // Inicializacion del formulario
  formNewGenre: FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl(""),
  })

  // Funcion para guardar el nuevo genero
  registerGenre() {
    // Envio de los datos del formulario al servicio genero
    this.genreService.createGenre(this.formNewGenre.value).subscribe({
      next: (data: Genero) => {
        // Almacenamiento de los datos y cierre del dialog
        this.dialogRef.close();
      }, error: (error) => {
        if (error) {
          // Si se encuentra un genero con el mismo nombre, se lanza un error
          this.formNewGenre.setErrors({foundGenre: true });
        }
      }
    });
  }

  // Getter para acceder desde HTML al control del formulario
  get name() {
    return this.formNewGenre.get('nombre')!;
  }

  // Funcion para cerrar el dialog
  closeForm(): void {
    this.dialogRef.close();
  }

}