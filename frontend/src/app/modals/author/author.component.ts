import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CreateBookComponent } from '../../pages/admin/admin-books/create-book/create-book.component';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Autor } from '../../interfaces/autor';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorService } from '../../services/author-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,FormsModule, ReactiveFormsModule],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<CreateBookComponent>);
  
  constructor(
    private formBuilder: FormBuilder,
    private authorService: AuthorService,
    
  ){}

  ngOnInit(): void {

    this.formNewAuthor = this.formBuilder.group ({
      id:[null],
      nombre:["",[Validators.required]]
      
    });

  }

  formNewAuthor:FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl(""),
    
  })
  

  registerAuthor(){
      this.authorService.createAuthor(this.formNewAuthor.value).subscribe((data:Autor) =>{
          console.log(data);
          //this.ngOnInit();
          this.dialogRef.close(data);
        }, error=> {
      if(error){
        this.formNewAuthor.setErrors({foundauthor: true})
      }
    })
    }
  closeForm(): void {
    this.dialogRef.close();
  }
}
