import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { BookSectionComponent } from '../../pages/books/book-section/book-section.component';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StateService } from '../../services/state-service';
import { Estado } from '../../interfaces/estado';
import { Libro } from '../../interfaces/libro';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book-service';
import { Usuario } from '../../interfaces/usuario';
import { ServicesService } from '../../services/services.service';
import { ReadingService } from '../../services/reading-service';
import { LecturaDTO } from '../../interfaces/lecturaDTO';
import {CommonModule} from "@angular/common"

@Component({
  selector: 'app-reading',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatToolbarModule,MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,FormsModule, ReactiveFormsModule],
  templateUrl: './reading.component.html',
  styleUrl: './reading.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadingComponent implements OnInit{
  user!: Usuario;
  estados!: Estado[];

  //////////////////
  
  rateStars: number=5;
  ratingArray:any=[];
  selectedStar:number= 0;
  previousSelection:number=0;
  ////////////////////
  
  readonly dialogRef = inject(MatDialogRef<BookSectionComponent>);

  fromParentComponent: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private stateService: StateService,
    private userService: ServicesService,
    private readingService: ReadingService,
    
    
  ){
    this.fromParentComponent = data;
  }

  ngOnInit(): void {
    
    console.log(this.data)

    

    this.formNewReading = this.formBuilder.group ({
      idLectura:[null],
      idLibro:[{id:null}],
      idUsuario:[{id:null}],
      idEstado:[{id:null}],
      puntuacion:[null]
      
      
    });

    this.retrieveFromLocalStorage();

    this.fillForm();
    
    this.getStates();

    this.ratingArray= Array(this.rateStars).fill(0);
    

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
        this.formNewReading.patchValue({
          idUsuario:this.user.id,
          idLibro: this.data,
          idEstado: 1,
          
        })
      }

  formNewReading:FormGroup = new FormGroup({
    idLectura: new FormControl(null),
    idLibro: new FormControl(null),
    idUsuario: new FormControl(null),
    idEstado: new FormControl(null),
    puntuacion: new FormControl(0)
    
  })

  

  getStates(){
    this.stateService.getStatesList().subscribe((data:Estado[])=>{
      this.estados = data;
    })
  }

  

      registerReading(){
        this.readingService.saveReading(this.formNewReading.value).subscribe((data:LecturaDTO) =>{
                  console.log(data);
                  //this.ngOnInit();
                  this.dialogRef.close(data);
      });
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
      this.formNewReading.patchValue({
          
          puntuacion: this.selectedStar,
          
        })
    }
    
  
}
