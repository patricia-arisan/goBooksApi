import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CreateBookComponent } from '../../pages/admin/admin-books/create-book/create-book.component';
import { GenreService } from '../../services/genre-service';
import { Genero } from '../../interfaces/genero';

@Component({
  selector: 'app-genre',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,FormsModule, ReactiveFormsModule],
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenreComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<CreateBookComponent>);

  constructor(
    private formBuilder: FormBuilder,
    private genreService: GenreService,
    
  ){}

  ngOnInit(): void {

    this.formNewGenre = this.formBuilder.group ({
      id:[null],
      nombre:["",[Validators.required]]
      
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
      closeForm(): void {
    this.dialogRef.close();
  }

}
