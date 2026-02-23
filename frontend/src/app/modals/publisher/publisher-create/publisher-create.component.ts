import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { PublisherService } from '../../../services/publisher-service';
import { Editorial } from '../../../interfaces/editorial';

/**
 * Componente para crear la editorial
 */
@Component({
  selector: 'app-publisher-create',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogTitle, MatDialogContent, FormsModule, ReactiveFormsModule],
  templateUrl: './publisher-create.component.html',
  styleUrl: './publisher-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublisherCreateComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<PublisherCreateComponent>);

  constructor(
    private formBuilder: FormBuilder,
    private publisherService: PublisherService,
  ) {}

  /**
   * Definicion de estructura y validaciones del formulario al iniciar el componente
   */
  ngOnInit(): void {
    this.formNewPublisher = this.formBuilder.group({
      id: [null],
      nombre: ["", [Validators.required, Validators.pattern(/^.*\S.*$/)]]
    });
  }

  // Inicializacion del formulario
  formNewPublisher: FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl(""),
  })

  // Funcion para guardar la nueva editorial
  registerEditorial() {
    // Envio de los datos del formulario al servicio editorial
    this.publisherService.createPublisher(this.formNewPublisher.value).subscribe({
      next: (data: Editorial) => {
        // Almacenamiento de los datos y cierre del dialog
        this.dialogRef.close();
      }, error: (error) => {
        if (error) {
          // Si se encuentra una editorial con el mismo nombre, se lanza un error
          this.formNewPublisher.setErrors({foundPublisher: true});
        }
      }
    });
  }

  // Getter para acceder desde HTML al control del formulario
  get name() {
    return this.formNewPublisher.get('nombre')!;
  }

  // Funcion para cerrar el dialog
  closeForm(): void {
    this.dialogRef.close();
  }

}