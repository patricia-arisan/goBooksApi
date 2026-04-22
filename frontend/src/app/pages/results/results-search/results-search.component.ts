import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';


import { HeaderUserComponent } from '../../shared/headers/header-user/header-user.component';
import { Libro } from '../../../interfaces/libro';
import { BookService } from '../../../services/book-service';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { UserService } from '../../../services/user-service';
import { Usuario } from '../../../interfaces/usuario';
import { HeaderAdminComponent } from '../../shared/headers/header-admin/header-admin.component';

/**
 * Componente para mostrar los resultados de busqueda de libros
 */
@Component({
  selector: 'app-results-search',
  standalone: true,
  imports: [RouterLink, HeaderUserComponent, HeaderAdminComponent, MatPaginatorModule],
  templateUrl: './results-search.component.html',
  styleUrl: './results-search.component.css'
})
export class ResultsSearchComponent implements OnInit {
  books!: Libro[];
  user!: Usuario;
  searchedWord!: string;
  // Controles del paginator
  totalItems = 0;
  pageSize = 16;
  pageIndex = 0;
  // Libros a mostrar por el paginador
  trackedBooks!: Libro[];

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private paginator: MatPaginatorIntl,
    private userService: UserService,
  ) {}

  /**
   * Recuperacion del usuario y del termino de busqueda al iniciar el componente
   * Realizacion de la busqueda del termino y cambio de idioma a mostrar del paginator
   */
  ngOnInit(): void {
    this.retrieveFromLocalStorage();

    this.route.params.subscribe(params => {
      this.searchedWord = params['searchedWord'];

    });
    this.getCurrentSearch();
    this.translatePaginator();
  }

  // Funcion para recuperar al usuario
  retrieveFromLocalStorage() {
    // Recuperacion del usuario actual mediante el id guardado en el localstorage
    let value = this.userService.getItem('id');
    let currentUser = 0;
    if (value !== null) {
      currentUser = parseInt(value);
      this.userService.getLoggedUser(currentUser).subscribe((data: Usuario) => {
        this.user = data;
      });
    }
  }

  // Funcion para buscar el resultado o resultados con el servicio libro
  getCurrentSearch() {
    this.bookService.searchByBookAuthorEditorial(this.searchedWord).subscribe((data: Libro[]) => {
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
