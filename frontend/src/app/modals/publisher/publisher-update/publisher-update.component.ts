import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

import { Editorial } from '../../../interfaces/editorial';
import { PublisherService } from '../../../services/publisher-service';

/**
 * Componente para actualizar la editorial
 */
@Component({
  selector: 'app-publisher-update',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogTitle, MatDialogContent, FormsModule, ReactiveFormsModule],
  templateUrl: './publisher-update.component.html',
  styleUrl: './publisher-update.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublisherUpdateComponent implements OnInit {
  publisher!: Editorial;
  fromParentComponent: number;
  readonly dialogRef = inject(MatDialogRef<PublisherUpdateComponent>);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private formBuilder: FormBuilder,
    private publisherService: PublisherService,
  ) {
    /**
     * Almacenamiento del id de la editorial que puede venir del componente AdminPublishersComponent,
     * BookUpdateComponent o AdminBooksUpdateComponent
     */
    this.fromParentComponent = data;
  }

  /**
   * Definicion de estructura y validaciones del formulario al iniciar el componente
   * Recuperacion de la editorial y rellenado de formulario
   */
  ngOnInit(): void {
    this.formUpdatePublisher = this.formBuilder.group({
      id: [null],
      nombre: ["", [Validators.required, , Validators.pattern(/^.*\S.*$/)]]
    });

    this.findCurrentPublisher();
  }

  // Inicializacion del formulario
  formUpdatePublisher: FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl(""),
  })

  // Funcion para recuperar la informacion de la editorial a actualizar y enviarla al formulario
  findCurrentPublisher() {
    this.publisherService.getPublisherById(this.data).subscribe((data: Editorial) => {
      this.publisher = data;
      this.fillForm();
    });
  }

  // Funcion para rellenar los datos de la editorial
  fillForm() {
    this.formUpdatePublisher.patchValue({
      id: this.publisher.id,
      nombre: this.publisher.nombre,
    });
  }

  // Funcion para actualizar la editorial
  updatePublisher() {
    // Envio de los datos del formulario al servicio editorial
    this.publisherService.updatePublisher(this.publisher.id, this.formUpdatePublisher.value).subscribe({
      next: (data: Editorial) => {
        // Almacenamiento de los datos y cierre del dialog
        this.dialogRef.close(data);
      }, error: (error) => {
        if (error) {
          // Si se encuentra una editorial con el mismo nombre, se lanza un error
          this.formUpdatePublisher.setErrors({foundPublisher: true});
        }
      }
    });
  }

  // Getter para acceder desde HTML al control del formulario
  get name() {
    return this.formUpdatePublisher.get('nombre')!;
  }

  // Funcion para cerrar el dialog
  closeForm(): void {
    this.dialogRef.close();
  }

}