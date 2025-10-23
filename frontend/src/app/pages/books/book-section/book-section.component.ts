import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { HeaderUserComponent } from '../../shared/headers/header-user/header-user.component';
import { BookService } from '../../../services/book-service';
import { Libro } from '../../../interfaces/libro';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StateService } from '../../../services/state-service';
import { Estado } from '../../../interfaces/estado';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReadingCreateComponent } from '../../../modals/reading/reading-create/reading-create.component';
import { ReadingService } from '../../../services/reading-service';
import { Lectura } from '../../../interfaces/lectura';


//////////
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import { ServicesService } from '../../../services/services.service';
import { Usuario } from '../../../interfaces/usuario';
import { ReadingUpdateComponent } from '../../../modals/reading/reading-update/reading-update.component';

import { DecimalPipe, formatNumber } from '@angular/common';
import { HeaderAdminComponent } from '../../shared/headers/header-admin/header-admin.component';

@Component({
  selector: 'app-book-section',
  standalone: true,
  imports: [DecimalPipe,RouterLink,HeaderUserComponent,MatButtonModule,MatCardModule, MatRadioModule, MatSliderModule, MatProgressSpinnerModule],
  templateUrl: './book-section.component.html',
  styleUrl: './book-section.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush No????? Si se pone desaparece score
  //decimalpipe para redondeo
})
export class BookSectionComponent implements OnInit{
  user!: Usuario;
  id!: string;
  libro!: Libro;
  estados!: Estado[];
  lectura!: Lectura;
  
  puntuacion!: number;
  valor!: number;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private readingService: ReadingService,
    private userService: ServicesService,
      
    ){}

  ngOnInit(): void {
    this.retrieveFromLocalStorage();
    this.route.params.subscribe(params => {
      this.id = params['libro.id'];
    console.log(this.id)
    });
    
    this.getCurrentBook();
    this.getScore();
    // this.getStates(); 
    
    this.getPercentage();
    this.getBookState();
    
  }

  retrieveFromLocalStorage() {
          this.user = JSON.parse(localStorage.getItem('usuario') || '')
          
          let value = this.userService.getItem('id');
             
          let currentUser = 0;
          if(value!=null){
            currentUser = parseInt(value);
                        
            this.userService.getLoggedUser(currentUser).subscribe((data:Usuario)=>{
              console.log(data)
              this.user = data;
              
                  
            });
          }  
        }

  getCurrentBook(){
    let idLibro = parseInt(this.id)
    this.bookService.getBookById(idLibro).subscribe((data:Libro)=>{
          this.libro = data;
          console.log(this.libro)
        })
  }

  readonly dialog = inject(MatDialog);

  openReadingDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(ReadingCreateComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
        disableClose: true,
        data:this.libro.id
        
      }).afterClosed().subscribe((reloadView:boolean) => { 
        if(reloadView) window.location.reload(); 
      } )
    }

    openReadingUpdateDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(ReadingUpdateComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
        disableClose: true,
        data:this.libro.id
        
      }).afterClosed().subscribe((reloadView:boolean) => { 
        if(reloadView) window.location.reload(); 
      } )
    }

    getScore(){
      let idLibro = parseInt(this.id)
      // let puntuacion = 0.0;
      this.readingService.getAverageReading(idLibro).subscribe((number)=>{
        this.puntuacion = number;
        
        
      })
    }

  // getStates(){
  //   this.stateService.getStatesList().subscribe((data:Estado[])=>{
  //     this.estados = data;
  //   })
  // }

  //progreso fijo
  mode: ProgressSpinnerMode = 'determinate';
  
  getPercentage(){
    

    let idLibro = parseInt(this.id)
      
      this.readingService.getAverageReading(idLibro).subscribe((number)=>{
       
        this.puntuacion=number;
        this.valor=(100*this.puntuacion)/5;
      })
    
  }
    
  getBookState(){
    let idLibro = parseInt(this.id)
    this.readingService.getReadingBookState(this.user.id,idLibro).subscribe((data:Lectura)=>{
          this.lectura = data;
          
        })
  }
  

}
