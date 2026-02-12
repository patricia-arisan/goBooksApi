import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { HeaderUserComponent } from '../../shared/headers/header-user/header-user.component';
import { Libro } from '../../../interfaces/libro';
import { BookService } from '../../../services/book-service';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Usuario } from '../../../interfaces/usuario';

import { HeaderAdminComponent } from '../../shared/headers/header-admin/header-admin.component';
import { UserService } from '../../../services/user-service';
import { Autor } from '../../../interfaces/autor';
import { AuthorService } from '../../../services/author-service';

/**
 * Componente para mostrar los resultados de libros por autor y por orden alfabetico
 */
@Component({
  selector: 'app-results-author',
  standalone: true,
  imports: [RouterLink,HeaderUserComponent,HeaderAdminComponent,MatPaginatorModule],
  templateUrl: './results-author.component.html',
  styleUrl: './results-author.component.css'
})
export class ResultsAuthorComponent implements OnInit{
  user!: Usuario;
  books!: Libro[];
  author!: Autor;
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
    private authorService: AuthorService,      
  ) {}

  /**
   * Recuperacion del usuario y id del autor al iniciar el componente
   * Obtencion del autor con el id de la url y listado de sus libros
   * Cambio de idioma a mostrar del paginator
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];    
    });

    this.retrieveFromLocalStorage();
    this.getAuthor();
    this.getBooksByAuthor();
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

  // Funcion para listar los libros del autor por orden alfabetico
  getBooksByAuthor(){
    let idAuthor = parseInt(this.id);
    this.bookService.getBookByAuthorId(idAuthor).subscribe((data:Libro[])=>{
          this.books = data;
          // Guardado del total de elementos del listado para la posterior paginacion
          this.totalItems=this.books.length;
          
        })
  }

  // Funcion para obtener los datos del autor
  getAuthor(){
    let idAuthor = parseInt(this.id);
    this.authorService.getAuthorById(idAuthor).subscribe((data:Autor)=>{
      this.author = data;
    })
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
