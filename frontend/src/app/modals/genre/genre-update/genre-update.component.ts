import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

import { GenreService } from '../../../services/genre-service';
import { Genero } from '../../../interfaces/genero';

import { Usuario } from '../../../interfaces/usuario';
import { Libro } from '../../../interfaces/libro';
import { BookService } from '../../../services/book-service';
import { UserService } from '../../../services/user-service';
import { AdminBooksUpdateComponent } from '../../../pages/admin/admin-books/admin-books-update/admin-books-update.component';



@Component({
  selector: 'app-genre-update',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogTitle, MatDialogContent,FormsModule, ReactiveFormsModule],
  templateUrl: './genre-update.component.html',
  styleUrl: './genre-update.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenreUpdateComponent implements OnInit{
  user!: Usuario;
    libro!: Libro;
  readonly dialogRef = inject(MatDialogRef<AdminBooksUpdateComponent>);
  fromParentComponent: number;
  genero!:Genero;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private genreService: GenreService,
    private bookService: BookService,
    private userService: UserService,
  ){
    this.fromParentComponent = data;
  }

  ngOnInit(): void {
    this.retrieveFromLocalStorage();

    this.formUpdateGenre = this.formBuilder.group ({
      id:[null],
      nombre:["",[Validators.required,Validators.pattern(/^.*\S.*$/)]]
      
    });

    // this.getCurrentBook();
setTimeout(() => {
    this.findCurrentGenre();
    }, 500);
    setTimeout(() => {
    this.fillForm();
      }, 600);

  }

  retrieveFromLocalStorage() {
              this.user = JSON.parse(localStorage.getItem('usuario') || '')
              
              let value = this.userService.getItem('id');
                 
              let currentUser = 0;
              if(value!=null){
                currentUser = parseInt(value);
                            
                this.userService.getLoggedUser(currentUser).subscribe((data:Usuario)=>{
                  
                  this.user = data;
                  
                      
                });
              }  
            }


  findCurrentGenre(){
      
      this.genreService.getGenreById(this.data).subscribe((data: Genero) => {
      
            this.genero = data;
          //  console.log(this.genero)
      
          })
    }

    fillForm(){
    
        this.formUpdateGenre.patchValue({
          
            id: this.genero.id,
          nombre:this.genero.nombre,
        
        
          
        
    });
      
   }

  formUpdateGenre:FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl(""),
    
  })

  updateGenre(){
      this.genreService.updateGenre(this.genero.id,this.formUpdateGenre.value).subscribe({next:(data:Genero) =>{
            console.log(data);
            this.dialogRef.close(data);
          }, error: (error)=>{
      if(error){
        this.formUpdateGenre.setErrors({foundGenre: true})
      }
    }
    })
      }

      get nombre(){
    return this.formUpdateGenre.get('nombre')!;
  }  
      closeForm(): void {
    this.dialogRef.close();
  }

}
