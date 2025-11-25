import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';



import { Editorial } from '../../../interfaces/editorial';
import { Usuario } from '../../../interfaces/usuario';
import { Libro } from '../../../interfaces/libro';
import { BookService } from '../../../services/book-service';
import { UserService } from '../../../services/user-service';


import { PublisherService } from '../../../services/publisher-service';
import { AdminBooksUpdateComponent } from '../../../pages/admin/admin-books/admin-books-update/admin-books-update.component';




@Component({
  selector: 'app-publisher-update',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,FormsModule, ReactiveFormsModule],
  templateUrl: './publisher-update.component.html',
  styleUrl: './publisher-update.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublisherUpdateComponent implements OnInit{
  user!: Usuario;
  libro!: Libro;
  editorial!:Editorial;
  fromParentComponent: number;
  readonly dialogRef = inject(MatDialogRef<AdminBooksUpdateComponent>);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private publisherService: PublisherService,
    private bookService: BookService,
    private userService: UserService,
  ){
    this.fromParentComponent = data;
  }

  ngOnInit(): void {
    this.retrieveFromLocalStorage();

    this.formUpdatePublisher = this.formBuilder.group ({
      id:[null],
      nombre:["",[Validators.required]]
      
    });

    // this.getCurrentBook();
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

  // getCurrentBook(){
    
  //   this.bookService.getBookById(this.data).subscribe((data:Libro)=>{
      
  //         this.libro = data;
  //         console.log(this.libro)
          
  //       })
        
  // }

  findCurrentPublisher(){
      
      this.publisherService.getPublisherById(this.data).subscribe((data: Editorial) => {
      
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
