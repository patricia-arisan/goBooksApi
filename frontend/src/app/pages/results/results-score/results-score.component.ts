import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';


import { HeaderUserComponent } from '../../shared/headers/header-user/header-user.component';
import { Libro } from '../../../interfaces/libro';
import { BookService } from '../../../services/book-service';


@Component({
  selector: 'app-results',
  standalone: true,
  imports: [RouterLink,HeaderUserComponent],
  templateUrl: './results-score.component.html',
  styleUrl: './results-score.component.css'
})
export class ResultsScoreComponent implements OnInit{
  libros!: Libro[];
  

  constructor(
    
    private bookService: BookService
      
    ){}

  ngOnInit(): void {
    
    this.getBooksOrderByScore();
  }

  getBooksOrderByScore(){
    
    this.bookService.getListBookScore().subscribe((data:Libro[])=>{
          this.libros = data;
          
        })
  }

}
