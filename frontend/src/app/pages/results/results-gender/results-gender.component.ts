import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';


import { HeaderUserComponent } from '../../shared/headers/header-user/header-user.component';
import { Libro } from '../../../interfaces/libro';
import { BookService } from '../../../services/book-service';


@Component({
  selector: 'app-results',
  standalone: true,
  imports: [RouterLink,HeaderUserComponent],
  templateUrl: './results-gender.component.html',
  styleUrl: './results-gender.component.css'
})
export class ResultsGenderComponent implements OnInit{
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
    this.getBooksByGender();
  }

  getBooksByGender(){
    let idGenero = parseInt(this.id)
    this.bookService.getBookByGenderId(idGenero).subscribe((data:Libro[])=>{
          this.libros = data;
          
        })
  }

}
