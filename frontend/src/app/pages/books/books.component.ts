import { Component, OnInit } from '@angular/core';
import { HeaderUserComponent } from '../shared/headers/header-user/header-user.component';
import { Libro } from '../../interfaces/libro';
import { BookService } from '../../services/book-service';
import { RouterLink} from '@angular/router';
import {MatPaginatorModule, PageEvent,MatPaginatorIntl} from '@angular/material/paginator';

/**
 * Componente para mostrar todos los libros en orden alfabetico
 */
@Component({
  selector: 'app-books',
  standalone: true,
  imports: [RouterLink,HeaderUserComponent,MatPaginatorModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit{
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
  ){}
  /**
   * Obtencion del listado de libros al iniciar el componente
   * Cambio de idioma a mostrar del paginator
   */
  ngOnInit(): void {    
    this.getBooks();
    this.translatePaginator();    
  }
  
  // Funcion para cambiar el idioma y personalizar el paginator
  translatePaginator(){
    // Cambio del texto del selector
    this.paginator.itemsPerPageLabel= "Resultados por página";
    // Texto del conteo de paginas existentes en funcion de los elementos mostrados de la lista
    this.paginator.getRangeLabel= (page: number, pageSize: number, length: number) =>{
      if (length === 0) {
      return `Página 1 de 1`;
    }
      const totalPages = Math.ceil(length / pageSize);
      return `Página ${page + 1} de ${totalPages}`;
    }
  }

  // Funcion para listar los libros existentes en la bbdd por orden alfabetico
  getBooks(){
    this.bookService.getBooksByNameOrder().subscribe((data:Libro[])=>{
            this.books = data;
            // Guardado del total de elementos del listado para la posterior paginacion
            this.totalItems=this.books.length;  
            this.updateVisibleBooks();
          });    
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