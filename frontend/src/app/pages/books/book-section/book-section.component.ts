import { Component, inject, OnInit } from '@angular/core';
import { HeaderUserComponent } from '../../shared/headers/header-user/header-user.component';
import { BookService } from '../../../services/book-service';
import { Libro } from '../../../interfaces/libro';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../../../services/state-service';
import { Estado } from '../../../interfaces/estado';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReadingComponent } from '../../../modals/reading/reading.component';
import { ReadingService } from '../../../services/reading-service';
import { Lectura } from '../../../interfaces/lectura';


//////////
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-book-section',
  standalone: true,
  imports: [HeaderUserComponent,MatButtonModule,MatCardModule, MatRadioModule, MatSliderModule, MatProgressSpinnerModule],
  templateUrl: './book-section.component.html',
  styleUrl: './book-section.component.css'
})
export class BookSectionComponent implements OnInit{
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
    
      
    ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['libro.id'];
    console.log(this.id)
    });
    
    this.getCurrentBook();
    this.getScore();
    // this.getStates(); 
    
    this.getPercentage();
    
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
      this.dialog.open(ReadingComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
        data:this.libro.id
        
      });
    }

    getScore(){
      let idLibro = parseInt(this.id)
      // let puntuacion = 0.0;
      this.readingService.getAverageReading(idLibro).subscribe((number)=>{
        // this.puntuacion = number;
        this.puntuacion=number;
        
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
    
  
  

}
