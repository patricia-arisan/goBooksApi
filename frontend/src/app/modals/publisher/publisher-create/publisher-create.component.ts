import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { AdminBooksCreateComponent } from '../../../pages/admin/admin-books/admin-books-create/admin-books-create.component';
import { PublisherService } from '../../../services/publisher-service';
import { Editorial } from '../../../interfaces/editorial';




@Component({
  selector: 'app-publisher-create',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,FormsModule, ReactiveFormsModule],
  templateUrl: './publisher-create.component.html',
  styleUrl: './publisher-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublisherCreateComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<AdminBooksCreateComponent>);

  constructor(
    private formBuilder: FormBuilder,
    private publisherService: PublisherService,
  ){}

  ngOnInit(): void {

    this.formNewPublisher = this.formBuilder.group ({
      id:[null],
      nombre:["",[Validators.required,Validators.pattern(/^.*\S.*$/)]]
      
    });

  }

  formNewPublisher:FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl(""),
    
  })

  registerEditorial(){
        this.publisherService.createPublisher(this.formNewPublisher.value).subscribe({next:(data:Editorial) =>{
            console.log(data);
            this.dialogRef.close();
          }, error: (error)=> {
                if(error){
                  this.formNewPublisher.setErrors({foundPublisher: true})
                }
          }
              })
      }

      get nombre(){
    return this.formNewPublisher.get('nombre')!;
  }  

    closeForm(): void {
    this.dialogRef.close();
  }


}
