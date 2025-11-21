import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderUserComponent } from '../shared/headers/header-user/header-user.component';
import { Libro } from '../../interfaces/libro';
import { BookService } from '../../services/book-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import {MatPaginator, MatPaginatorModule, PageEvent,MatPaginatorIntl} from '@angular/material/paginator';


@Component({
  selector: 'app-books',
  standalone: true,
  imports: [RouterLink,HeaderUserComponent,MatPaginatorModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit{
  libros!: Libro[];
  libro!: Libro;
  // id!: string;
  totalItems = 0;
  pageSize = 16;
  pageIndex = 0;
  
  
  // @ViewChild(MatPaginator,{ static: true }) paginator!: MatPaginator;
  
  
  constructor(
    // private route: ActivatedRoute,
    private bookService: BookService,
    private paginator: MatPaginatorIntl
    
  ){}

  ngOnInit(): void {
    
    this.getBooks();
    this.translatePaginator();
    
    
  }

  
  translatePaginator(){
    this.paginator.itemsPerPageLabel= "Resultados por página";
    this.paginator.getRangeLabel= (page: number, pageSize: number, length: number) =>{
      if (length === 0) {
      return `Página 1 de 1`;
    }
      const totalPaginas = Math.ceil(length / pageSize);
      return `Página ${page + 1} de ${totalPaginas}`;
    }
  }

  getBooks(){
    this.bookService.getBooksByNameOrder().subscribe((data:Libro[])=>{
            this.libros = data;
            this.totalItems=this.libros.length;
            
            
          })
    
  }

  onPageChange(event: PageEvent): void {
    // this.totalItems = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // this.libros.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
    // this.getBooks();
    
  }


}
