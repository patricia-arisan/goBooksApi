import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { Usuario } from '../../interfaces/usuario';
import { HeaderAdminComponent } from '../shared/headers/header-admin/header-admin.component';
import { HeaderUserComponent } from '../shared/headers/header-user/header-user.component';
import { BookService } from '../../services/book-service';
import { Libro } from '../../interfaces/libro';

////
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeaderAdminComponent, HeaderUserComponent, FormsModule, ReactiveFormsModule], ///FormsModule, ReactiveFormsModule
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
    private userService: ServicesService,
    private bookService: BookService,
    ////
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {

    this.retrieveFromLocalStorage();
    this.getLastBooks();
    this.getBestScores();

    //////
    this.formSearch = this.formBuilder.group({

      clave: [""],


    });


  }

  ////
  formSearch: FormGroup = new FormGroup({

    clave: new FormControl(""),

  })
  /////


  retrieveFromLocalStorage() {

    this.user = JSON.parse(localStorage.getItem('usuario') || '')
    //this.user = JSON.parse(localStorage.getItem('usuario') || '')
    let value = this.userService.getItem('id');
    //let credentials = localStorage.getItem('token') || ''
    //   let credentials = localStorage.getItem('token') || ''
    //let cred = JSON.stringify(credentials);
    console.log("Value antes de current: " + value)

    let currentUser = 0;
    if (value !== null) { //en angular ===
      currentUser = parseInt(value);
      console.log("STRING A INT" + currentUser);

      //this.userService.getLoggedUser(currentUser,this.user).subscribe((data:Usuario)=>{

      this.userService.getLoggedUser(currentUser).subscribe((data: Usuario) => {

        this.user = data;
        console.log("DATOS HOME " + this.user);
        console.log("Local" + this.user.id);

      });

    }

    console.log(currentUser);

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
}