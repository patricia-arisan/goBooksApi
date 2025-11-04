import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CreateBookComponent } from '../../pages/admin/admin-books/create-book/create-book.component';
import { EditorialService } from '../../services/editorial-service';
import { Editorial } from '../../interfaces/editorial';

@Component({
  selector: 'app-editorial',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,FormsModule, ReactiveFormsModule],
  templateUrl: './editorial.component.html',
  styleUrl: './editorial.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorialComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<CreateBookComponent>);

  constructor(
    private formBuilder: FormBuilder,
    private editorialService: EditorialService,
  ){}

  ngOnInit(): void {

    this.formNewEditorial = this.formBuilder.group ({
      id:[null],
      nombre:["",[Validators.required]]
      
    });

  }

  formNewEditorial:FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl(""),
    
  })

  registerEditorial(){
        this.editorialService.createEditorial(this.formNewEditorial.value).subscribe((data:Editorial) =>{
            console.log(data);
            this.dialogRef.close();
          }, error=> {
                if(error){
                  this.formNewEditorial.setErrors({foundpublisher: true})
                }
              })
      }

    closeForm(): void {
    this.dialogRef.close();
  }


}
