import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';


import { HeaderUserComponent } from '../../shared/headers/header-user/header-user.component';
import { Libro } from '../../../interfaces/libro';
import { BookService } from '../../../services/book-service';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-results-publisher',
  standalone: true,
  imports: [RouterLink,HeaderUserComponent,MatPaginatorModule],
  templateUrl: './results-publisher.component.html',
  styleUrl: './results-publisher.component.css'
})
export class ResultsPublisherComponent implements OnInit{
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
    this.getBooksByPublisher();
    this.translatePaginator();
  }

  getBooksByPublisher(){
    let idPublisher = parseInt(this.id)
    this.bookService.getBookByPublisherId(idPublisher).subscribe((data:Libro[])=>{
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
