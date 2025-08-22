import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';


import { HeaderUserComponent } from '../../shared/headers/header-user/header-user.component';
import { Libro } from '../../../interfaces/libro';
import { BookService } from '../../../services/book-service';


@Component({
  selector: 'app-results',
  standalone: true,
  imports: [RouterLink,HeaderUserComponent],
  templateUrl: './results-search.component.html',
  styleUrl: './results-search.component.css'
})
export class ResultsSearchComponent implements OnInit{
  libros!: Libro[];
  busqueda!:string;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
      
    ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.busqueda = params['busqueda'];
    
    });
    this.getCurrentSearch();
  }

  getCurrentSearch(){
    this.bookService.searchByBookAuthorEditorial(this.busqueda).subscribe((data:Libro[]) =>{
       this.libros=data;
       })
  }
  

}
