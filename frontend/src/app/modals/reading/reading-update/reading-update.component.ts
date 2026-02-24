import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StateService } from '../../../services/state-service';
import { Estado } from '../../../interfaces/estado';
import { Libro } from '../../../interfaces/libro';
import { BookService } from '../../../services/book-service';
import { Usuario } from '../../../interfaces/usuario';

import { ReadingService } from '../../../services/reading-service';
import { CommonModule } from "@angular/common"
import { Lectura } from '../../../interfaces/lectura';
import { UserService } from '../../../services/user-service';

/**
 * Componente para cambiar el estado de la lectura
 */
@Component({
  selector: 'app-reading-update',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatToolbarModule, MatButtonModule, MatDialogActions, MatDialogTitle, MatDialogContent, FormsModule, ReactiveFormsModule],
  templateUrl: './reading-update.component.html',
  styleUrl: './reading-update.component.css',
})
export class ReadingUpdateComponent implements OnInit {
  user!: Usuario;
  states!: Estado[];
  reading!: Lectura;
  book!: Libro;
  rateStars: number = 5;
  ratingArray: any = [];
  selectedStar: number = 0;
  selectedOption: string = "";
  readonly dialogRef = inject(MatDialogRef<ReadingUpdateComponent>);
  fromParentComponent: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private bookService: BookService,
    private formBuilder: FormBuilder,
    private stateService: StateService,
    private userService: UserService,
    private readingService: ReadingService,
  ) {
    // Almacenamiento del id del libro que viene del componente BookSectionComponent
    this.fromParentComponent = data;
  }

  /**
   * Definicion de estructura y validaciones del formulario al iniciar el componente
   * Recuperacion del libro y los estados 
   * Recuperacion de usuario, lectura y estrellas, y rellenado de formulario
   * Preparacion del array para las 5 estrellas 
   */
  ngOnInit(): void {
    this.formUpdateReading = this.formBuilder.group({
      id: [null],
      puntuacion: [null],
      estado: this.formBuilder.group({
        id: [null]
      }),
      libro: this.formBuilder.group({
        id: [null]
      }),
      usuario: this.formBuilder.group({
        id: [null]
      }),
    });

    this.getCurrentBook();
    this.getStates();    
    this.retrieveUserAndReading();    

    this.ratingArray = Array(this.rateStars).fill(0);
  }

  // Funcion para recuperar la informacion del libro actual con el id del componente padre
  getCurrentBook() {
    this.bookService.getBookById(this.data).subscribe((data: Libro) => {
      this.book = data;
    });
  }

  // Funcion para recuperar el listado de estados existentes
  getStates() {
    this.stateService.getStatesList().subscribe((data: Estado[]) => {
      this.states = data;
    });
  } 

  // Funcion para recuperar al usuario y buscar el estado de su lectura
  retrieveUserAndReading() {
    let value = this.userService.getItem('id');
    let currentUser = 0;
    if (value != null) {
      currentUser = parseInt(value);
      this.userService.getLoggedUser(currentUser).subscribe((data: Usuario) => {        
        this.user = data;
        this.findReading();        
      });
    }
  }

  // Funcion para rellenar el formulario
  fillForm() {
    this.formUpdateReading.patchValue({
      id: this.reading.id,
      puntuacion: this.reading.puntuacion,
      estado: {
        id: this.reading.estado.id,
      },
      libro: {
        id: this.reading.libro.id,
      },
      usuario: {
        id: this.reading.usuario.id,
      }
    });
  }

  // Inicializacion del formulario
  formUpdateReading: FormGroup = new FormGroup({
    id: new FormControl(null),
    puntuacion: new FormControl(null),
    estado: new FormGroup({
      id: new FormControl(null)
    }),
    libro: new FormGroup({
      id: new FormControl(null)
    }),
    usuario: new FormGroup({
      id: new FormControl(null)
    })
  })   

  // Funcion para recoger el valor de la opcion seleccionada en el select del estado
  captureSelect(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement)!.value;
    this.selectedOption = selectedValue;
    // Si se selecciona como pendiente, se elimina la puntuacion
    if (this.selectedOption === '3') {
      this.formUpdateReading.patchValue({
        puntuacion: null
      });
    }
  }

  // Funcion para encontrar la lectura del usuario, con su id y el del libro, rellenar el form y las estrellas
  findReading() {
    this.readingService.getReadingBook(this.user.id, this.data).subscribe((data: Lectura) => {
      this.reading = data;
      this.fillForm();
      this.setSavedStars();
    });
  }

  // Funcion para confirmar y guardar la seleccion haciendo click, y rellenar el formulario con el valor
  rating(index: number) {
    this.selectedStar = index + 1;
    this.fillRating();
  }

  // Funcion para rellenar la puntuacion del formulario con el valor de las estrellas seleccionadas
  fillRating() {
    this.formUpdateReading.patchValue({
      puntuacion: this.selectedStar,
    });
  }

  // Funcion para recuperar las estrellas previamente guardadas de la lectura en Leido
  setSavedStars() {
    this.selectedStar = this.reading.puntuacion;
  }

  // Funcion para cambiar el estado de la lectura
  changeSituation() {
    // Si se marca como No leido, se elimina la lectura asociada al usuario
    if (this.selectedOption === '1') {
      this.readingService.deleteReading(this.reading.id).subscribe((data: any) => {
        this.dialogRef.close(true);
      });
    } else {
      // Si se marca otra opcion, se actualiza en estado a Leido o Pendiente
      this.readingService.updateReading(this.reading.id, this.formUpdateReading.value).subscribe((data: Lectura) => {
        this.dialogRef.close(true);
      });
    }
  }

  // Funcion para cerrar el dialog
  closeForm(): void {
    this.dialogRef.close(false);
  }

}