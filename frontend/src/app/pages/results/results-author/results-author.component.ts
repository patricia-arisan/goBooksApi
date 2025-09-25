import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';


import { HeaderUserComponent } from '../../shared/headers/header-user/header-user.component';
import { Libro } from '../../../interfaces/libro';
import { BookService } from '../../../services/book-service';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-results-author',
  standalone: true,
  imports: [RouterLink,HeaderUserComponent,MatPaginatorModule],
  templateUrl: './results-author.component.html',
  styleUrl: './results-author.component.css'
})
export class ResultsAuthorComponent implements OnInit{
  libros!: Libro[];
  id!: string;
  totalItems = 0;
  pageSize = 16;
  pageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private paginator: MatPaginatorIntl
      
    ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      
    
    });
    this.getBooksByAuthor();
    this.translatePaginator();
  }

  getBooksByAuthor(){
    let idAuthor = parseInt(this.id)
    this.bookService.getBookByAuthorId(idAuthor).subscribe((data:Libro[])=>{
          this.libros = data;
          this.totalItems=this.libros.length;
          
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
