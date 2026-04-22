import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Usuario } from '../../../interfaces/usuario';
import { Libro } from '../../../interfaces/libro';

import { BookService } from '../../../services/book-service';
import { HeaderAdminComponent } from '../../shared/headers/header-admin/header-admin.component';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

/**
 * Componente de la Home del administrador
 */
@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [RouterLink, HeaderAdminComponent, FormsModule, ReactiveFormsModule, MatPaginatorModule], 
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {
  user!: Usuario;
  books!: Libro[];
  // Controles del paginator
  totalItems = 0;
  pageSize = 16;
  pageIndex = 0;
  searchedWord!: string;
  // Libros a mostrar por el paginador
  trackedBooks!: Libro[];

  constructor(
    private router: Router,
    private bookService: BookService,
    private paginator: MatPaginatorIntl,
    private formBuilder: FormBuilder,
  ) {}

  /**
   * Carga de listado completo de ultimos libros al iniciar el componente
   * Cambio de idioma a mostrar del paginator
   * Definicion de estructura del formulario de busqueda de palabras clave
   */
  ngOnInit(): void {
    this.getAllLastBooks();
    this.translatePaginator();

    this.formSearch = this.formBuilder.group({
      clave: [""],
    });
  }

  // Inicializacion del formulario de busqueda
  formSearch: FormGroup = new FormGroup({
    clave: new FormControl(""),
  });
  
  // Funcion para listar ultimos libros incorporados
  getAllLastBooks() {
    this.bookService.getAllLastBooks().subscribe((data: Libro[]) => {
      this.books = data;
      // Guardado del total de elementos del listado para la posterior paginacion
      this.totalItems = this.books.length;
      this.updateVisibleBooks();
    });
  }

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

  // Redireccion a la pagina de resultados en la que se hara la busqueda del termino introducido
  search() {
    let searchedWord = this.formSearch.get('clave')?.value;
    this.router.navigate(['results/search', searchedWord]);
  }

  // Funcion para calcular los libros a mostrar 
  updateVisibleBooks() {
    this.trackedBooks = this.books.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + 
      this.pageSize);
  }
}