import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HeaderUserComponent } from '../../shared/headers/header-user/header-user.component';
import { Libro } from '../../../interfaces/libro';
import { BookService } from '../../../services/book-service';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

/**
 * Componente para mostrar los libros por orden de incorporacion, del mas nuevo al mas antiguo
 */
@Component({
  selector: 'app-results-last',
  standalone: true,
  imports: [RouterLink, HeaderUserComponent, MatPaginatorModule],
  templateUrl: './results-last.component.html',
  styleUrl: './results-last.component.css'
})
export class ResultsLastComponent implements OnInit {
  books!: Libro[];
  // Controles del paginator
  totalItems = 0;
  pageSize = 16;
  pageIndex = 0;
  // Libros a mostrar por el paginador
  trackedBooks!: Libro[];

  constructor(
    private bookService: BookService,
    private paginator: MatPaginatorIntl
  ) {}

  /**
   * Listado de libros por orden de incorporacion al iniciar el componente
   * Cambio de idioma a mostrar del paginator
   */
  ngOnInit(): void {
    this.getAllLastBooks();
    this.translatePaginator();
  }

  // Funcion para recuperar el listado de libros, del mas actual al primero incorporado
  getAllLastBooks() {
    this.bookService.getAllLastBooks().subscribe((data: Libro[]) => {
      this.books = data;
      // Guardado del total de elementos del listado para la posterior paginacion
      this.totalItems = this.books.length;
      this.updateVisibleBooks();
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
    this.updateVisibleBooks();
  }

  // Funcion para calcular los libros a mostrar 
  updateVisibleBooks() {
    this.trackedBooks = this.books.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + 
      this.pageSize);
  }

}