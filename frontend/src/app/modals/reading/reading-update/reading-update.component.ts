import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { BookSectionComponent } from '../../../pages/books/book-section/book-section.component';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StateService } from '../../../services/state-service';
import { Estado } from '../../../interfaces/estado';
import { Libro } from '../../../interfaces/libro';
import { BookService } from '../../../services/book-service';
import { Usuario } from '../../../interfaces/usuario';
import { ServicesService } from '../../../services/services.service';
import { ReadingService } from '../../../services/reading-service';
import { LecturaDTO } from '../../../interfaces/lecturaDTO';
import {CommonModule} from "@angular/common"
import { Lectura } from '../../../interfaces/lectura';

@Component({
  selector: 'app-reading-update',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatToolbarModule,MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,FormsModule, ReactiveFormsModule],
  templateUrl: './reading-update.component.html',
  styleUrl: './reading-update.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadingUpdateComponent implements OnInit{
  user!: Usuario;
  estados!: Estado[];
  lectura!: Lectura;
  libro!: Libro;
  rateStars: number=5;
  ratingArray:any=[];
  selectedStar:number= 0;
  previousSelection:number=0;
  selectedOption: string="";
  
  
  readonly dialogRef = inject(MatDialogRef<BookSectionComponent>);

  fromParentComponent: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookService: BookService,
    private formBuilder: FormBuilder,
    private stateService: StateService,
    private userService: ServicesService,
    private readingService: ReadingService,
    
    
  ){
    this.fromParentComponent = data;
  }

  ngOnInit(): void {
    
    console.log(this.data)
    this.retrieveFromLocalStorage();
    this.getStates();
    this.getCurrentBook();
    this.findReading();
    
     ///aqui rating no da problemas

    this.formUpdateReading = this.formBuilder.group ({
      id:[null],
      puntuacion:[null],
      estado:this.formBuilder.group({
          id:[null] }),
      libro:this.formBuilder.group({
          id:[null] }),
      usuario:this.formBuilder.group({
          id:[null] }),
    });

      setTimeout(() => {
     this.fillForm();
     }, 900);
    
    this.ratingArray= Array(this.rateStars).fill(0);

    //mejor async pipe?? investigar 
    setTimeout(() => {
     this.setSavedStars();
     }, 900);
    
    
     
  }
  
  getCurrentBook(){
    
    this.bookService.getBookById(this.data).subscribe((data:Libro)=>{
          this.libro = data;
          
        })
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

      fillForm(){
        
         this.formUpdateReading.patchValue({
          id:this.lectura.id,
          puntuacion:this.lectura.puntuacion,
          estado: {
          id: this.lectura.estado.id,
          
        },
          libro: {
          id: this.lectura.libro.id,
          
        },
          usuario:{
          id: this.lectura.usuario.id,
          
        }
        })
        
        
        
      }

  formUpdateReading:FormGroup = new FormGroup({
    id: new FormControl(null),
    puntuacion:new FormControl(null),
    estado: new FormGroup({
        id: new FormControl(null)}),
    libro: new FormGroup({
        id: new FormControl(null)}),
    usuario: new FormGroup({
        id: new FormControl(null)})
  })

  

  getStates(){
    this.stateService.getStatesList().subscribe((data:Estado[])=>{
      this.estados = data;
      
    })
  }

  

    //   registerReading(){
    //     this.readingService.saveReading(this.formUpdateReading.value).subscribe((data:LecturaDTO) =>{
    //               console.log(data);
    //               this.dialogRef.close(data);
    //   });
    // }

    

    

  closeForm(): void {
    this.dialogRef.close();
  }

  captureSelect(event:Event){
      
      const selectedValue = (event.target as HTMLSelectElement)!.value;
      console.log("selected",selectedValue);
      this.selectedOption = selectedValue;
      
    }

    findReading(){
      console.log(this.user.id); 
      console.log(this.data); 
      this.readingService.getReadingBook(this.user.id,this.data).subscribe((data:Lectura) =>{
          
        this.lectura=data;
         console.log(this.lectura); 
             
    })
      

    }

  setStar(index:number){
      this.selectedStar= index+1;
    }

    unselectStar(){
      if(this.previousSelection!==0){
        this.selectedStar = this.previousSelection;
      }else{
        this.selectedStar=0;
      }
    }

    rating(index:number){
      
      this.selectedStar= index+1;
      this.previousSelection= this.selectedStar;
      console.log(this.selectedStar)
      this.fillRating();
      
    }

  fillRating(){
      this.formUpdateReading.patchValue({
          
          puntuacion: this.selectedStar,
          
        })
    }

   setSavedStars(){
    this.selectedStar=this.lectura.puntuacion;
   }

   
    
   
    update(){
      
      
      this.readingService.updateReading(this.lectura.id,this.formUpdateReading.value).subscribe((data:Lectura) =>{
      
      
      localStorage.setItem('usuario', JSON.stringify(data));
      
        const idUsuario = data.id.toString();
        
        this.userService.setItem('id',idUsuario);
        
        this.dialogRef.close(data);
    })
    };
  
}
