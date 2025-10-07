import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

import { EditorialService } from '../../../services/editorial-service';
import { UpdateBookComponent } from '../../../pages/admin/admin-books/update-book/update-book.component';
import { Editorial } from '../../../interfaces/editorial';
import { Usuario } from '../../../interfaces/usuario';
import { Libro } from '../../../interfaces/libro';
import { BookService } from '../../../services/book-service';
import { ServicesService } from '../../../services/services.service';



@Component({
  selector: 'app-update-publisher',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,FormsModule, ReactiveFormsModule],
  templateUrl: './update-publisher.component.html',
  styleUrl: './update-publisher.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdatePublisherComponent implements OnInit{
  user!: Usuario;
  libro!: Libro;
  editorial!:Editorial;
  fromParentComponent: number;
  readonly dialogRef = inject(MatDialogRef<UpdateBookComponent>);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private publisherService: EditorialService,
    private bookService: BookService,
    private userService: ServicesService,
  ){
    this.fromParentComponent = data;
  }

  ngOnInit(): void {
    this.retrieveFromLocalStorage();

    this.formUpdatePublisher = this.formBuilder.group ({
      id:[null],
      nombre:["",[Validators.required]]
      
    });

    this.getCurrentBook();
setTimeout(() => {
    this.findCurrentPublisher();
    }, 500);
    setTimeout(() => {
    this.fillForm();
      }, 600);

  }

  formUpdatePublisher:FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl(""),
    
  })

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

  getCurrentBook(){
    
    this.bookService.getBookById(this.data).subscribe((data:Libro)=>{
      
          this.libro = data;
          console.log(this.libro)
          
        })
        
  }

  findCurrentPublisher(){
      
      this.publisherService.getPublisherById(this.libro.editorial.id).subscribe((data: Editorial) => {
      
            this.editorial = data;
           
      
          })
    }
  
    fillForm(){
      
          this.formUpdatePublisher.patchValue({
            
              id: this.editorial.id,
            nombre:this.editorial.nombre,
         
        
            
            
          
      });
        
     }

  updatePublisher(){
      this.publisherService.updatePublisher(this.editorial.id,this.formUpdatePublisher.value).subscribe((data:Editorial) =>{
        
          this.dialogRef.close(data);
          
          })
      }

    closeForm(): void {
    this.dialogRef.close();
  }


}
