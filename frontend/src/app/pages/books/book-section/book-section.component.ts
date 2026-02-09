import { Component, inject, OnInit } from '@angular/core';
import { HeaderUserComponent } from '../../shared/headers/header-user/header-user.component';
import { BookService } from '../../../services/book-service';
import { Libro } from '../../../interfaces/libro';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReadingCreateComponent } from '../../../modals/reading/reading-create/reading-create.component';
import { ReadingService } from '../../../services/reading-service';
import { Lectura } from '../../../interfaces/lectura';

import { ProgressSpinnerMode, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';

import { Usuario } from '../../../interfaces/usuario';
import { ReadingUpdateComponent } from '../../../modals/reading/reading-update/reading-update.component';

import { DecimalPipe } from '@angular/common';
import { HeaderAdminComponent } from '../../shared/headers/header-admin/header-admin.component';
import { UserService } from '../../../services/user-service';

/**
 * Componente para mostrar la informacion del libro
 */
@Component({
  selector: 'app-book-section',
  standalone: true,
  imports: [DecimalPipe, RouterLink, HeaderUserComponent, HeaderAdminComponent, MatButtonModule, MatCardModule, MatRadioModule, MatSliderModule, MatProgressSpinnerModule],
  templateUrl: './book-section.component.html',
  styleUrl: './book-section.component.css'
})
export class BookSectionComponent implements OnInit {
  user!: Usuario;
  id!: string;
  book!: Libro;
  reading!: Lectura;
  score!: number;
  bookValue!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private readingService: ReadingService,
    private userService: UserService,
  ) { }
  /**
   * Recuperacion del usuario, del libro y del estado de la lectura al iniciar el componente
   * Recuperacion de la puntuacion global del libro de forma numerica y porcentual
   */
  ngOnInit(): void {
    this.retrieveFromLocalStorage();
    this.route.params.subscribe(params => {
      this.id = params['libro.id'];
    });
    this.getCurrentBook();
    this.getScore();
    this.getPercentage();
  }
  // Funcion para recuperar al usuario y, si su rol es de Usuario, recuperar el estado de la lectura
  retrieveFromLocalStorage() {
    // Recuperacion del usuario actual mediante el id guardado en el localstorage
    let value = this.userService.getItem('id');
    let currentUser = 0;
    if (value !== null) {
      currentUser = parseInt(value);
      this.userService.getLoggedUser(currentUser).subscribe((data: Usuario) => {
        this.user = data;
        // Recuperacion del estado de la lectura si el rol es de Usuario
        if (this.user.rol.id === 2) {
          this.getBookState();
        }
      });
    }
  }

  // Funcion para recuperar la informacion del libro actual
  getCurrentBook() {
    // Recuperacion del id obtenido de los parametros de la url para buscar el libro con el servicio
    let idBook = parseInt(this.id);
    this.bookService.getBookById(idBook).subscribe((data: Libro) => {
      this.book = data;
    });
  }

  // Inyeccion de dependencias para usar MatDialog
  readonly dialog = inject(MatDialog);

  // Funcion para abrir el componente para agregar una nueva lectura
  openReadingCreateDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ReadingCreateComponent, {
      // Ancho de dialog fijo
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      // Elemento para evitar el cierre del dialog al presionar fuera de este
      disableClose: true,
      // Envio del id del libro
      data: this.book.id      
    }).afterClosed().subscribe((reloadView: boolean) => {
      // Si el dialog devuelve un true al cerrarse, la pagina se actualiza para mostrar el nuevo estado
      if (reloadView) window.location.reload();
    });
  }

  // Funcion para abrir el componente para actualizar o borrar la lectura
  openReadingUpdateDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ReadingUpdateComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      // Envio del id del libro
      data: this.book.id      
    }).afterClosed().subscribe((reloadView: boolean) => {
      // Si el dialog devuelve un true al cerrarse, la pagina se actualiza para mostrar el estado actualizado
      if (reloadView) window.location.reload();
    })
  }

  // Funcion para obtener la puntuacion media del libro
  getScore() {
    let idBook = parseInt(this.id);
    // Envio del id del libro para obtener la puntuacion media con el servicio
    this.readingService.getAverageReading(idBook).subscribe((number) => {
      this.score = number;
    });
  }

  /**
   * Definicion del comportamiento de Progress Spinner bajo un valor fijo
   * En este caso uno es fijado a 100 en el html y el otro vendra dado por la funcion getPercentage
   */
  mode: ProgressSpinnerMode = 'determinate';
  // Funcion para recuperar la puntuacion media del libro y calcular se porcentaje sobre la nota maxima de 5
  getPercentage() {
    let idBook = parseInt(this.id);
    // Envio del id del libro para obtener la puntuacion media con el servicio
    this.readingService.getAverageReading(idBook).subscribe((number) => {
      this.score = number;
      // Calculo del porcentaje de la puntuacion media
      this.bookValue = (100 * this.score) / 5;
    });
  }

  // Funcion para obtener el estado en que se encuentra el libro respecto al usuario
  getBookState() {
    let idBook = parseInt(this.id);
    // Envio del id del libro obtenido de la url y el id del usuario al servicio de la lectura
    this.readingService.getReadingBookState(this.user.id, idBook).subscribe((data: Lectura) => {
      this.reading = data;
    });
  }

  // Funcion para dirigir al administrador a la pagina para editar el libro
  goEdit() {
    this.router.navigate(["/admin-books/book-section/editar/", this.book.id]);
  }

}
