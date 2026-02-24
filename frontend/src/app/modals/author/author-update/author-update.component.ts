import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthorService } from '../../../services/author-service';
import { Autor } from '../../../interfaces/autor';

/**
 * Componente para actualizar autor
 */
@Component({
  selector: 'app-author-update',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogTitle, MatDialogContent, FormsModule, ReactiveFormsModule],
  templateUrl: './author-update.component.html',
  styleUrl: './author-update.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorUpdateComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AuthorUpdateComponent>);
  fromParentComponent: number;
  author!: Autor;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private formBuilder: FormBuilder,
    private authorService: AuthorService,
  ) {
    /**
     * Almacenamiento del id de autor que puede venir del componente AdminAuthorsComponent,
     * BookUpdateComponent o AdminBooksUpdateComponent
     */ 
    this.fromParentComponent = data;
  }

  /**
   * Definicion de estructura y validaciones del formulario al iniciar el componente
   * Recuperacion del autor y rellenado de formulario
   */
  ngOnInit(): void {
    this.formUpdateAuthor = this.formBuilder.group({
      id: [null],
      nombre: ["", [Validators.required, Validators.pattern(/^.*\S.*$/)]],
    });

    this.findCurrentAuthor();
  }

  // Funcion para recuperar la informacion del autor a actualizar y enviarla al formulario
  findCurrentAuthor() {
    this.authorService.getAuthorById(this.data).subscribe((data: Autor) => {
      this.author = data;
      this.fillForm();
    });
  }

  // Funcion para rellenar los datos del autor
  fillForm() {
    this.formUpdateAuthor.patchValue({
      id: this.author.id,
      nombre: this.author.nombre,
    });
  }

  // Inicializacion del formulario
  formUpdateAuthor: FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl(""),
  })

  // Funcion para actualizar el autor
  updateAuthor() {
    // Envio de los datos del formulario al servicio de autor
    this.authorService.updateAuthor(this.author.id, this.formUpdateAuthor.value).subscribe({
      next: (data: Autor) => {
        // Almacenamiento de los datos y cierre del dialog
        this.dialogRef.close(data);
      }, error: (error) => {
        if (error) {
          // Si se encuentra un autor con el mismo nombre, se lanza un error
          this.formUpdateAuthor.setErrors({foundAuthor: true});
        }
      }
    });
  }

  // Getter para acceder desde HTML al control del formulario
  get name() {
    return this.formUpdateAuthor.get('nombre')!;
  }

  // Funcion para cerrar el dialog
  closeForm(): void {
    this.dialogRef.close();
  }

}