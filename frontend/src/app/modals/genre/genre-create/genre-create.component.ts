import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { AdminBooksCreateComponent } from '../../../pages/admin/admin-books/admin-books-create/admin-books-create.component';
import { GenreService } from '../../../services/genre-service';
import { Genero } from '../../../interfaces/genero';


@Component({
  selector: 'app-genre-create',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogTitle, MatDialogContent,FormsModule, ReactiveFormsModule],
  templateUrl: './genre-create.component.html',
  styleUrl: './genre-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenreCreateComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<AdminBooksCreateComponent>);

  constructor(
    private formBuilder: FormBuilder,
    private genreService: GenreService,
    
  ){}

  ngOnInit(): void {

    this.formNewGenre = this.formBuilder.group ({
      id:[null],
      nombre:["",[Validators.required,Validators.pattern(/^.*\S.*$/)]]
      
    });

  }

  formNewGenre:FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl(""),
    
  })

  registerGenre(){
        this.genreService.createGenre(this.formNewGenre.value).subscribe({next:(data:Genero) =>{
            console.log(data);
            this.dialogRef.close();
          }, error: (error)=>{
      if(error){
        this.formNewGenre.setErrors({foundGenre: true})
      }
    }
    })
      }

    get nombre(){
    return this.formNewGenre.get('nombre')!;
  }  
      closeForm(): void {
    this.dialogRef.close();
  }

}
