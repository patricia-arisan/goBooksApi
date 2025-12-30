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


@Component({
  selector: 'app-results-author',
  standalone: true,
  imports: [RouterLink,HeaderUserComponent,HeaderAdminComponent,MatPaginatorModule],
  templateUrl: './results-author.component.html',
  styleUrl: './results-author.component.css'
})
export class ResultsAuthorComponent implements OnInit{
  user!: Usuario;
  libros!: Libro[];
  autor!: Autor;
  id!: string;
  totalItems = 0;
  pageSize = 16;
  pageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private paginator: MatPaginatorIntl,
    private userService: UserService,
    private authorService: AuthorService,
      
    ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      
    
    });
    this.retrieveFromLocalStorage();
    this.getAuthor();
    this.getBooksByAuthor();
    this.translatePaginator();
  }

  retrieveFromLocalStorage() {
          this.user = JSON.parse(localStorage.getItem('usuario') || '')
          
          let value = this.userService.getItem('id');
             
          let currentUser = 0;
          if(value!=null){
            currentUser = parseInt(value);
                        
            this.userService.getLoggedUser(currentUser).subscribe((data:Usuario)=>{
              
              this.user = data;
              
                  
            });
          }  
        }

  getBooksByAuthor(){
    let idAuthor = parseInt(this.id);
    this.bookService.getBookByAuthorId(idAuthor).subscribe((data:Libro[])=>{
          this.libros = data;
          this.totalItems=this.libros.length;
          
        })
  }

  getAuthor(){
    let idAuthor = parseInt(this.id);
    this.authorService.getAuthorById(idAuthor).subscribe((data:Autor)=>{
      this.autor = data;
    })
  }

   translatePaginator() {
    this.paginator.itemsPerPageLabel = "Resultados por página";
    this.paginator.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0) {
        return `Página 1 de 1`;
      }
      const totalPaginas = Math.ceil(length / pageSize);
      return `Página ${page + 1} de ${totalPaginas}`;
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

}
