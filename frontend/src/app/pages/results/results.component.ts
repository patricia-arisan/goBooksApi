import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookService } from '../../services/book-service';
import { Libro } from '../../interfaces/libro';
import { HeaderUserComponent } from '../shared/headers/header-user/header-user.component';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [RouterLink,HeaderUserComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit{
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
