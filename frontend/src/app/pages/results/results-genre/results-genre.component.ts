import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';


import { HeaderUserComponent } from '../../shared/headers/header-user/header-user.component';
import { Libro } from '../../../interfaces/libro';
import { BookService } from '../../../services/book-service';


@Component({
  selector: 'app-results',
  standalone: true,
  imports: [RouterLink,HeaderUserComponent],
  templateUrl: './results-genre.component.html',
  styleUrl: './results-genre.component.css'
})
export class ResultsGenreComponent implements OnInit{
  libros!: Libro[];
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
      
    ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      
    
    });
    this.getBooksByGenre();
  }

  getBooksByGenre(){
    let idGenero = parseInt(this.id)
    this.bookService.getBookByGenreId(idGenero).subscribe((data:Libro[])=>{
          this.libros = data;
          
        })
  }

}
