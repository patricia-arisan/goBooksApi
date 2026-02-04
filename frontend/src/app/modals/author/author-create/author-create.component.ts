import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthorService } from '../../../services/author-service';
import { AdminBooksCreateComponent } from '../../../pages/admin/admin-books/admin-books-create/admin-books-create.component';
import { Autor } from '../../../interfaces/autor';

@Component({
  selector: 'app-author-create',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogTitle, MatDialogContent,FormsModule, ReactiveFormsModule],
  templateUrl: './author-create.component.html',
  styleUrl: './author-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorCreateComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<AdminBooksCreateComponent>);
  
  constructor(
    private formBuilder: FormBuilder,
    private authorService: AuthorService,
    
  ){}

  ngOnInit(): void {

    this.formNewAuthor = this.formBuilder.group ({
      id:[null],
      nombre:["",[Validators.required,Validators.pattern(/^.*\S.*$/)]]
      
    });

  }

  formNewAuthor:FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl(""),
    
  })
  

  registerAuthor(){
      this.authorService.createAuthor(this.formNewAuthor.value).subscribe({next:(data:Autor) =>{
          console.log(data);
          //this.ngOnInit();
          this.dialogRef.close(data);
        }, error: (error)=> {
      if(error){
        this.formNewAuthor.setErrors({foundAuthor: true})
      }
        }
    });
    }
    get nombre(){
    return this.formNewAuthor.get('nombre')!;
  }  

  closeForm(): void {
    this.dialogRef.close();
  }
}
