import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Usuario } from '../../interfaces/usuario';
import { HeaderUserComponent } from '../shared/headers/header-user/header-user.component';
import { BookService } from '../../services/book-service';
import { Libro } from '../../interfaces/libro';

////
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeaderUserComponent, FormsModule, ReactiveFormsModule], ///FormsModule, ReactiveFormsModule
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  user!: Usuario;
  libros!: Libro[];
  librosPuntuacion!: Libro[];
  busqueda!: string;

  constructor(

    private router: Router,
    private userService: UserService,
    private bookService: BookService,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {

    this.retrieveFromLocalStorage();
    this.getLastBooks();
    this.getBestScores();

    this.formSearch = this.formBuilder.group({
      clave: [""],
    });

  }

  formSearch: FormGroup = new FormGroup({
    clave: new FormControl(""),
  });
 
  retrieveFromLocalStorage() {
    let value = this.userService.getItem('id');    
    let currentUser = 0;

    if (value !== null) { 
      currentUser = parseInt(value);

      this.userService.getLoggedUser(currentUser).subscribe((data: Usuario) => {
        this.user = data;
      });
    }
  }

  getLastBooks() {
    this.bookService.getLastBooks().subscribe((data: Libro[]) => {
      this.libros = data;
    })
  }

  getBestScores() {
    this.bookService.getBooksBestScore().subscribe((data: Libro[]) => {
      this.librosPuntuacion = data;
    })
  }

  search() {
    let busqueda = this.formSearch.get('clave')?.value;

    this.router.navigate(['results/search', busqueda]);
  }

  goBooksScore(){
    this.router.navigate(["/results/score"]);
  }

  goLastBooks(){
    this.router.navigate(["/results/lastBooks"]);
  }
}