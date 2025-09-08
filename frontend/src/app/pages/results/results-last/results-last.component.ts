import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';


import { HeaderUserComponent } from '../../shared/headers/header-user/header-user.component';
import { Libro } from '../../../interfaces/libro';
import { BookService } from '../../../services/book-service';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-results',
  standalone: true,
  imports: [RouterLink,HeaderUserComponent,MatPaginatorModule],
  templateUrl: './results-last.component.html',
  styleUrl: './results-last.component.css'
})
export class ResultsLastComponent implements OnInit{
  libros!: Libro[];
  totalItems = 0;
  pageSize = 16;
  pageIndex = 0;

  constructor(
    
    private bookService: BookService,
    private paginator: MatPaginatorIntl
      
    ){}

  ngOnInit(): void {
    
    this.getAllLastBooks();
    this.translatePaginator();
  }

  getAllLastBooks(){
      this.bookService.getAllLastBooks().subscribe((data:Libro[])=>{
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
