import { Component, OnInit } from '@angular/core';
import { HeaderUserComponent } from '../shared/headers/header-user/header-user.component';
import { Libro } from '../../interfaces/libro';
import { BookService } from '../../services/book-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [RouterLink,HeaderUserComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit{
  libros!: Libro[];
  libro!: Libro;
  // id!: string;

  constructor(
    // private route: ActivatedRoute,
    private bookService: BookService,
    
  ){}

  ngOnInit(): void {
    this.getBooks();
    // this.getBookSection();
    // this.route.params.subscribe(params => {
    //   this.id = params['libro.id'];
    //   // Now you can use the ID in the URL wherever you want in the this.id variable.
    // });
  }

  getBooks(){
    this.bookService.getBooksByNameOrder().subscribe((data:Libro[])=>{
            this.libros = data;
          })
    
  }

  //////////////////////////
  // getBookSection(){
  //   //let id: number = parseInt(this.routee.snapshot.params['libro.id'])
    
  //   this.bookService.getBookById(this.libro.id).subscribe((data:Libro)=>{
  //     this.libro = data;
      
  //   })
  // }

}
