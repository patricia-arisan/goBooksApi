import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';
import { HeaderUserComponent } from '../shared/headers/header-user/header-user.component';
import { BookService } from '../../services/book-service';
import { Libro } from '../../interfaces/libro';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * Componente de la Home del usuario
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeaderUserComponent, FormsModule, ReactiveFormsModule], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  lastBooks!: Libro[];
  booksScore!: Libro[];
  searchedWord!: string;

  constructor(
    private router: Router,
    private bookService: BookService,
    private formBuilder: FormBuilder,

  ) {}

  /**
   * Carga de listados de ultimos libros y mejor valorados al iniciar el componente
   * Definicion de estructura del formulario de busqueda de palabras clave
   */
  ngOnInit(): void {
    this.getLastBooks();
    this.getBestScores();

    this.formSearch = this.formBuilder.group({
      clave: [""],
    });
  }

  // Inicializacion del formulario de busqueda
  formSearch: FormGroup = new FormGroup({
    clave: new FormControl(""),
  });

  // Funcion para listar los cuatro ultimos libros incorporados
  getLastBooks() {
    this.bookService.getLastBooks().subscribe((data: Libro[]) => {
      this.lastBooks = data;
    })
  }

  // Funcion para listar los cuatro libros mejor puntuados de mayor a menor
  getBestScores() {
    this.bookService.getBooksBestScore().subscribe((data: Libro[]) => {
      this.booksScore = data;
    })
  }

  // Redireccion a la pagina de resultados en la que se hara la busqueda del termino introducido
  search() {
    let searchedWord = this.formSearch.get('clave')?.value;
    this.router.navigate(['results/search', searchedWord]);
  }
  
  // Funciones para navegar a los distintos listados de libros
  goBooksScore(){
    this.router.navigate(["/results/score"]);
  }

  goLastBooks(){
    this.router.navigate(["/results/lastBooks"]);
  }
}