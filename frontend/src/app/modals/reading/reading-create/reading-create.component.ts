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
import { LecturaDTO } from '../../../interfaces/lecturaDTO';
import { CommonModule } from "@angular/common";
import { UserService } from '../../../services/user-service';

/**
 * Componente para agregar una nueva lectura
 */
@Component({
  selector: 'app-reading-create',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatToolbarModule, MatButtonModule, MatDialogActions, MatDialogTitle, MatDialogContent, FormsModule, ReactiveFormsModule],
  templateUrl: './reading-create.component.html',
  styleUrl: './reading-create.component.css',
})
export class ReadingCreateComponent implements OnInit {
  user!: Usuario;
  states!: Estado[];
  book!: Libro;
  rateStars: number = 5;
  ratingArray: any = [];
  selectedStar: number = 0;
  previousSelection: number = 0;
  selectedOption: string = "";
  readonly dialogRef = inject(MatDialogRef<ReadingCreateComponent>);
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
   * Recuperacion del libro, los estados y el usuario, y rellenado de esos datos
   * Preparacion del array para las 5 estrellas
   */
  ngOnInit(): void {
    this.formNewReading = this.formBuilder.group({
      idLectura: [null],
      idLibro: [{id: null}],
      idUsuario: [{id: null}],
      idEstado: [{id: null}],
      puntuacion: [null]
    });

    this.getCurrentBook();
    this.getStates();
    this.retrieveFromLocalStorageAndFill();

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

  // Funcion para recuperar al usuario y cargar sus datos en el formulario, junto a los de su lectura
  retrieveFromLocalStorageAndFill() {
    // Recuperacion del usuario actual mediante el id guardado en el localstorage
    let value = this.userService.getItem('id');
    let currentUser = 0;
    if (value != null) {
      currentUser = parseInt(value);
      this.userService.getLoggedUser(currentUser).subscribe((data: Usuario) => {
        this.user = data;
        // Llamada a la funcion para rellenar el formulario con los datos obtenidos
        this.fillForm();
      });
    }
  }

  // Funcion para rellenar el formulario, con estado 1 al ser una nueva lectura
  fillForm() {
    this.formNewReading.patchValue({
      idUsuario: this.user.id,
      idLibro: this.data,
      idEstado: 1,
    });
  }

  // Inicializacion del formulario
  formNewReading: FormGroup = new FormGroup({
    idLectura: new FormControl(null),
    idLibro: new FormControl(null),
    idUsuario: new FormControl(null),
    idEstado: new FormControl(null),
    puntuacion: new FormControl(0)
  })

  // Funcion para guardar la nueva lectura del usuario
  registerReading() {
    // Verificacion de que la lectura no se guarda como No leido
    if (this.formNewReading.value.idEstado !== 1) {
      this.readingService.saveReading(this.formNewReading.value).subscribe((data: LecturaDTO) => {
        // Almacenamiento de los datos y cierre del dialog
        this.dialogRef.close(data);
      });
    }
  }

  // Funcion para cambiar o rellenar el color de las estrellas al pasar el raton por encima
  setStar(index: number) {
    this.selectedStar = index + 1;
  }

  // Funcion para confirmar y guardar la seleccion haciendo click, y rellenar el formulario con el valor
  rating(index: number) {
    this.selectedStar = index + 1;
    this.previousSelection = this.selectedStar;
    this.fillRating();
  }

  // Funcion para deseleccionar las estrellas al volver a pasar el raton por encima
  unselectStar() {
    this.selectedStar = this.previousSelection;
  }  

  // Funcion para rellenar la puntuacion del formulario con el valor de las estrellas seleccionadas
  fillRating() {
    this.formNewReading.patchValue({
      puntuacion: this.selectedStar,
    });
  }  

  // Funcion para recoger el valor de la opcion seleccionada en el select del estado
  captureSelect(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement)!.value;
    this.selectedOption = selectedValue;
  }

  // Funcion para cerrar el dialog
  closeForm(): void {
    this.dialogRef.close();
  }

}