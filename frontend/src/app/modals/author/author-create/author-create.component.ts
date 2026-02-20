import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthorService } from '../../../services/author-service';
import { Autor } from '../../../interfaces/autor';

/**
 * Componente para crear autor
 */
@Component({
  selector: 'app-author-create',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogTitle, MatDialogContent, FormsModule, ReactiveFormsModule],
  templateUrl: './author-create.component.html',
  styleUrl: './author-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorCreateComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AuthorCreateComponent>);

  constructor(
    private formBuilder: FormBuilder,
    private authorService: AuthorService,
  ) {}

  /**
   * Definicion de estructura y validaciones del formulario al iniciar el componente
   */
  ngOnInit(): void {
    this.formNewAuthor = this.formBuilder.group({
      id: [null],
      nombre: ["", [Validators.required, Validators.pattern(/^.*\S.*$/)]]
    });
  }

  // Inicializacion del formulario
  formNewAuthor: FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl(""),
  })

  // Funcion para guardar el nuevo autor
  registerAuthor() {
    // Envio de los datos del formulario al servicio de autor
    this.authorService.createAuthor(this.formNewAuthor.value).subscribe({
      next: (data: Autor) => {
        // Almacenamiento de los datos y cierre del dialog
        this.dialogRef.close(data);
      }, error: (error) => {
        if (error) {
          // Si se encuentra un autor con el mismo nombre, se lanza un error
          this.formNewAuthor.setErrors({foundAuthor: true});
        }
      }
    });
  }

  // Getter para acceder desde HTML al control del formulario
  get name() {
    return this.formNewAuthor.get('nombre')!;
  }

  // Funcion para cerrar el dialog
  closeForm(): void {
    this.dialogRef.close();
  }
}