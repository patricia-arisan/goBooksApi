import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HeaderUserComponent } from '../../shared/headers/header-user/header-user.component';
import { Libro } from '../../../interfaces/libro';
import { BookService } from '../../../services/book-service';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

/**
 * Componente para mostrar los libros con puntuacion, ordenados de mayor a menor
 */
@Component({
  selector: 'app-results-score',
  standalone: true,
  imports: [RouterLink, HeaderUserComponent, MatPaginatorModule],
  templateUrl: './results-score.component.html',
  styleUrl: './results-score.component.css'
})
export class ResultsScoreComponent implements OnInit {
  books!: Libro[];
  // Controles del paginator
  totalItems = 0;
  pageSize = 16;
  pageIndex = 0;

  constructor(
    private bookService: BookService,
    private paginator: MatPaginatorIntl
  ) {}

  /**
   * Listado de libros de mayor a menor puntuacion al iniciar el componente
   * Cambio de idioma a mostrar del paginator
   */
  ngOnInit(): void {
    this.getBooksOrderByScore();
    this.translatePaginator();
  }

  // Funcion para listar los libros con puntuacion, de mayor a menor
  getBooksOrderByScore() {
    this.bookService.getListBookScore().subscribe((data: Libro[]) => {
      this.books = data;
      // Guardado del total de elementos del listado para la posterior paginacion
      this.totalItems = this.books.length;
    });
  }

  // Funcion para cambiar el idioma y personalizar el paginator
  translatePaginator() {
    // Cambio del texto del selector
    this.paginator.itemsPerPageLabel = "Resultados por página";
    // Texto del conteo de paginas existentes en funcion de los elementos mostrados de la lista
    this.paginator.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0) {
        return `Página 1 de 1`;
      }
      const totalPaginas = Math.ceil(length / pageSize);
      return `Página ${page + 1} de ${totalPaginas}`;
    }
  }

  // Funcion para detectar los cambios de pagina y en los elementos a mostrar por el paginator
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

}