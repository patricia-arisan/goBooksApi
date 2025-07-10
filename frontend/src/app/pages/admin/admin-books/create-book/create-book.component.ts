import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
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
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { AuthorComponent } from '../../../../modals/author/author.component';
import { EditorialComponent } from '../../../../modals/editorial/editorial.component';
import { GenderComponent } from '../../../../modals/gender/gender.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,HeaderAdminComponent,MatButtonModule],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush No cargan al principio las cosas, mejor quitar esto
})
export class CreateBookComponent implements OnInit{
  autores!: Autor[];
  editoriales!: Editorial[];
  generos!: Genero[];
    
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    private editorialService: EditorialService,
    private genderService: GenderService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getAuthors();
    this.getEditorials();
    this.getGenders();
    
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
    
    
  }

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

    ////////////////////////
    readonly dialog = inject(MatDialog);
    
    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AuthorComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe((data: Autor)=>{
      this.autores.push(data);
      console.log(this.autores)
      this.getAuthors();
    });
  }

  openEditorialDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EditorialComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openGenderDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(GenderComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  } 

    /////////////////////////

    
  

  registerBook(){
    this.bookService.createBook(this.formNewBook.value).subscribe((data:Libro) =>{
          console.log(data);
          this.router.navigate(['/admin-books']);
        })
    };

    

    

  
  

  

}
