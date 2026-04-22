import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { HeaderAdminComponent } from '../../shared/headers/header-admin/header-admin.component';
import { RouterLink } from '@angular/router';
import { BookService } from '../../../services/book-service';
import { Libro } from '../../../interfaces/libro';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { MatDialog } from '@angular/material/dialog';
import { BookUpdateComponent } from '../../../modals/book/book-update/book-update.component';

/**
 * Componente de Administrar libros 
 */
@Component({
  selector: 'app-admin-books',
  standalone: true,
  imports: [RouterLink, HeaderAdminComponent, MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule],
  templateUrl: './admin-books.component.html',
  styleUrl: './admin-books.component.css'
})
export class AdminBooksComponent implements OnInit, AfterViewInit {
  books!: Libro[];
  showBooksTable: Boolean = true;
  // Controles del paginator
  totalItems = 0;
  pageSize = 16;
  pageIndex = 0;
  // Libros a mostrar por el paginador
  trackedBooks!: Libro[];
  // Configuraciones de la tabla y el paginador
  dataSource = new MatTableDataSource<Libro>();
  displayedColumns: string[] = ['name', 'author', 'publisher', 'genre', 'edit'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // Array para filtrado de libro por busqueda
  filteredBooks!: any[];
  url: string = "/assets/icons/menu.png";
  url2: string = "/assets/icons/list.png";

  constructor(
    private bookService: BookService,
    private paginatorIn: MatPaginatorIntl
  ) {}

  /**
   * Obtencion del listado de libros al iniciar el componente
   * Definicion de la busqueda personalizada
   */  
  ngOnInit(): void {
    this.getBooks();
    this.filterByItem();
  }

  /**
   * Vinculacion del paginator con el listado de libros del dataSource
   * Cambio de idioma a mostrar del paginator 
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    this.translatePaginator();
  }

  // Funcion para listar los libros existentes en la bbdd por orden alfabetico
  getBooks() {
    this.bookService.getBooksByNameOrder().subscribe((data: Libro[]) => {
      this.books = data;
      // Guardado del total de elementos del listado para la posterior paginacion
      this.totalItems = this.books.length;
      // Almacenamiento de los libros en el dataSource
      this.dataSource.data = this.books;  
      this.updateVisibleBooks();    
    });
  }

  // Funcion para ocultar o mostrar la tabla y la galeria de libros
  toggleView() {
    this.showBooksTable = !this.showBooksTable;
    // Cambio de la imagen del boton en funcion de la vista activada
    if (!this.showBooksTable) {
      this.url = this.url2;
    } else {
      this.url = "/assets/icons/menu.png";
      // Carga del dataSource para la vista de la tabla 
      setTimeout(() => this.dataSource.paginator = this.paginator);
    }
  }

  // Funcion para filtrar en tiempo real en el dataSource
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Funcion para filtrar solo por algunos elementos definidos del libro y no por todos
  filterByItem() {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.nombre.toLowerCase().includes(filter) || data.autor.nombre.toLowerCase().includes(filter) || 
      data.editorial.nombre.toLowerCase().includes(filter) || data.genero.nombre.toLowerCase().includes(filter);
    }
  }

  // Funcion para filtrar en tiempo real en el listado de libros de la galeria
  applyFilterGalery(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // Filtrado por titulo de libro
    this.filteredBooks = this.books.filter(libro => libro.nombre.toLowerCase().includes(filterValue));
    // Guardado del total de elementos del listado para la posterior paginacion
    this.totalItems = this.filteredBooks.length;
    // Reinicio a la primera pagina al filtrar
    this.pageIndex = 0;
    this.updateVisibleBooks();
  }

  // Funcion para detectar los cambios de pagina y en los elementos a mostrar por el paginator
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateVisibleBooks();
  }

  // Funcion para cambiar el idioma y personalizar el paginator
  translatePaginator() {
    // Cambio del texto del selector
    this.paginatorIn.itemsPerPageLabel = "Resultados por página";
    // Texto del conteo de paginas existentes en funcion de los elementos mostrados de la lista
    this.paginatorIn.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0) {
        return `Página 1 de 1`;
      }
      const totalPaginas = Math.ceil(length / pageSize);
      return `Página ${page + 1} de ${totalPaginas}`;
    }
  }

  // Funcion para calcular los libros a mostrar 
  updateVisibleBooks() {
    if (this.filteredBooks && this.filteredBooks.length>0) {
      this.trackedBooks = this.filteredBooks.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + 
      this.pageSize);
    } else {
      this.trackedBooks = this.books.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + 
      this.pageSize);
    }    
  }

  // Inyeccion de dependencias para usar MatDialog
  readonly dialog = inject(MatDialog);

  // Funcion para abrir el componente para editar al libro
  openDialog(libro: Libro, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(BookUpdateComponent, {
      width: '330px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      // Envio del id del libro
      data: libro.id
    }).afterClosed().subscribe((data: Libro) => {
      // Carga del listado de libros
      this.getBooks();
    });
  }

}