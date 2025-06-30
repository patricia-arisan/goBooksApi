import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HeaderAdminComponent } from '../../../shared/headers/header-admin/header-admin.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../../../services/book-service';
import { Libro } from '../../../../interfaces/libro';
import { Autor } from '../../../../interfaces/autor';
import { AuthorService } from '../../../../services/author-service';
import { EditorialService } from '../../../../services/editorial-service';
import { GenderService } from '../../../../services/gender-service';
import { Editorial } from '../../../../interfaces/editorial';
import { Genero } from '../../../../interfaces/genero';

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,HeaderAdminComponent],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.css'
})
export class CreateBookComponent implements OnInit{
  autores!: Autor[];
  editoriales!: Editorial[];
  generos!: Genero[];
  showNewAuthorForm: Boolean = false;
  showNewEditorialForm: Boolean = false;
  showNewGeneroForm: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    private editorialService: EditorialService,
    private genderService: GenderService,
    private router: Router
  ){}

  ngOnInit(): void {
    // this.formNewBook = this.formBuilder.group ({
    //   id:[0],
    //   nombre:["",[Validators.required]],
    //   autor:this.formBuilder.group({
    //     id:[0],
    //     nombre:["",[Validators.required]]
    //   }),
    //   isbn:[""],
    //   editorial:this.formBuilder.group({
    //     id:[0],
    //     nombre:["",[Validators.required]]
    //   }),
    //   portada:[""],
    //   genero:this.formBuilder.group({
    //     id:[0],
    //     nombre:["",[Validators.required]]
    //   }),
    //   sinopsis:[""]
    // });

    

    this.formNewBook = this.formBuilder.group ({
      id:[null],
      nombre:["",[Validators.required]],
      autor:[{id:0}],
      isbn:["",[Validators.required]],
      editorial:[{id:0}],
      portada:["",[Validators.required]],
      genero:[{id:0}],
      sinopsis:["",[Validators.required]]
    });
    this.getAuthors();
    this.getEditorials();
    this.getGenders();
    // this.formNewAuthor = this.formBuilder.group ({
    //   id:[0],
    //   nombre:["",[Validators.required]]
    // });

    // this.formNewEditorial = this.formBuilder.group ({
    //   id:[0],
    //   nombre:["",[Validators.required]]
    // });

    // this.formNewGenero = this.formBuilder.group ({
    //   id:[0],
    //   nombre:["",[Validators.required]]
    // });
  }

  // formNewBook:FormGroup = new FormGroup({
  //   id: new FormControl(0),
  //   nombre: new FormControl(""),
  //   autor: new FormGroup({
  //     id:new FormControl(0),
  //     nombre: new FormControl("")
  //   }),
  //   isbn: new FormControl(""),
  //   editorial: new FormGroup({
  //     id:new FormControl(0),
  //     nombre: new FormControl("")
  //   }),
  //   portada: new FormControl(""),
  //   genero: new FormGroup({
  //     id:new FormControl(0),
  //     nombre: new FormControl("")
  //   }),
  //   sinopsis:new FormControl("")
  // })

  formNewBook:FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl(""),
    autor: new FormControl(0),
    isbn: new FormControl(""),
    editorial: new FormControl(0),
    portada: new FormControl(""),
    genero: new FormControl(0),
    sinopsis:new FormControl("")
  })

  // formNewAuthor:FormGroup = new FormGroup({
  //   id: new FormControl(0),
  //   nombre: new FormControl("")
  // })

  // formNewEditorial:FormGroup = new FormGroup({
  //   id: new FormControl(0),
  //   nombre: new FormControl("")
  // })

  // formNewGenero:FormGroup = new FormGroup({
  //   id: new FormControl(0),
  //   nombre: new FormControl("")
  // })

  getAuthors(){
    this.authorService.getAuthorsByNameOrder().subscribe((data:Autor[])=>{
        this.autores = data;
      })

    }

    getEditorials(){
    this.editorialService.getEditorialsByNameOrder().subscribe((data:Editorial[])=>{
        this.editoriales = data;
      })

    }

    getGenders(){
    this.genderService.getGendersByNameOrder().subscribe((data:Genero[])=>{
        this.generos = data;
      })

    }

    onChange(){

    }
  

  registerBook(){
    this.bookService.createBook(this.formNewBook.value).subscribe((data:Libro) =>{
          console.log(data);
          this.router.navigate(['/admin-books']);
        })
    };

    // registerAuthor(){
    //   this.authorService.createAuthor(this.formNewAuthor.value).subscribe((data:Autor) =>{
    //       console.log(data);
    //       this.router.navigate(['/create-books']);
    //     })
    // }

    registerEditorial(){
      
    }

    registerGenero(){
      
    }
  

  toggleForm(){
    this.showNewAuthorForm = !this.showNewAuthorForm;
    
  }

  toggleFormEditorial(){
    this.showNewEditorialForm = !this.showNewEditorialForm;
  }

  toggleFormGenero(){
    this.showNewGeneroForm = !this.showNewGeneroForm;
  }

  

}
