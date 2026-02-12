import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { HeaderUserComponent } from '../../shared/headers/header-user/header-user.component';
import { Libro } from '../../../interfaces/libro';
import { BookService } from '../../../services/book-service';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { Usuario } from '../../../interfaces/usuario';
import { HeaderAdminComponent } from '../../shared/headers/header-admin/header-admin.component';
import { UserService } from '../../../services/user-service';
import { Genero } from '../../../interfaces/genero';
import { GenreService } from '../../../services/genre-service';

/**
 * Componente para mostrar los resultados de libros por genero y por orden alfabetico
 */
@Component({
  selector: 'app-results-genre',
  standalone: true,
  imports: [RouterLink,HeaderUserComponent,HeaderAdminComponent,MatPaginatorModule],
  templateUrl: './results-genre.component.html',
  styleUrl: './results-genre.component.css'
})
export class ResultsGenreComponent implements OnInit{
  user!: Usuario;
  books!: Libro[];
  genre!: Genero;
  id!: string;
  // Controles del paginator
  totalItems = 0;
  pageSize = 16;
  pageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private paginator: MatPaginatorIntl,
    private userService: UserService,
    private genreService: GenreService      
  ) {}

  /**
   * Recuperacion del usuario y id del genero al iniciar el componente
   * Obtencion del genero con el id de la url y listado de sus libros
   * Cambio de idioma a mostrar del paginator
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];    
    });

    this.retrieveFromLocalStorage();
    this.getGenre();
    this.getBooksByGenre();
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

  // Funcion para listar los libros del genero por orden alfabetico
  getBooksByGenre(){
    let idGenre = parseInt(this.id);
    this.bookService.getBookByGenreId(idGenre).subscribe((data:Libro[])=>{
          this.books = data;
          // Guardado del total de elementos del listado para la posterior paginacion
          this.totalItems=this.books.length;          
        });
  }

  // Funcion para obtener los datos del genero
  getGenre(){
    let idGenre = parseInt(this.id);
    this.genreService.getGenreById(idGenre).subscribe((data:Genero)=>{
      this.genre = data;
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
