import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CreateBookComponent } from '../../pages/admin/admin-books/create-book/create-book.component';
import { GenderService } from '../../services/gender-service';
import { Genero } from '../../interfaces/genero';

@Component({
  selector: 'app-gender',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,FormsModule, ReactiveFormsModule],
  templateUrl: './gender.component.html',
  styleUrl: './gender.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenderComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<CreateBookComponent>);

  constructor(
    private formBuilder: FormBuilder,
    private genderService: GenderService,
    
  ){}

  ngOnInit(): void {

    this.formNewGender = this.formBuilder.group ({
      id:[null],
      nombre:["",[Validators.required]]
      
    });

  }

  formNewGender:FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl(""),
    
  })

  registerGender(){
        this.genderService.createGender(this.formNewGender.value).subscribe((data:Genero) =>{
            console.log(data);
            this.dialogRef.close();
          })
      }

}
