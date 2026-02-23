import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

import { Editorial } from '../../../interfaces/editorial';
import { PublisherService } from '../../../services/publisher-service';

/**
 * Componente para eliminar el registro de la editorial
 */
@Component({
  selector: 'app-publisher-delete',
  standalone: true,
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  templateUrl: './publisher-delete.component.html',
  styleUrl: './publisher-delete.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublisherDeleteComponent implements OnInit {
  publisher!: Editorial;
  readonly dialogRef = inject(MatDialogRef<PublisherDeleteComponent>);
  fromParentComponent: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private publisherService: PublisherService,
  ) {
    // Almacenamiento del id de la editorial del componente AdminPublishersComponent
    this.fromParentComponent = data;
  }

  /**
   * Recuperacion de la informacion de la editorial al iniciar el componente
   */
  ngOnInit(): void {
      this.findCurrentPublisher();    
  }

  // Funcion para recuperar la informacion de la editorial
  findCurrentPublisher() {
    this.publisherService.getPublisherById(this.data).subscribe((data: Editorial) => {
      this.publisher = data;
    });
  }

  // Funcion para eliminar editorial
  deletePublisher() {
    this.publisherService.deletePublisher(this.publisher.id).subscribe((data: any) => {
      // Si se realiza, devuelve true al cerrar para la actualizacion de la pagina
      this.dialogRef.close(true);
    });
  }

  // Funcion para cerrar el dialog
  closeDialog(): void {
    this.dialogRef.close();
  }

}