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

@Component({
  selector: 'app-book-section',
  standalone: true,
  imports: [HeaderUserComponent,MatButtonModule],
  templateUrl: './book-section.component.html',
  styleUrl: './book-section.component.css'
})
export class BookSectionComponent implements OnInit{
  id!: string;
  libro!: Libro;
  estados!: Estado[];
  

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private stateService: StateService
      
    ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['libro.id'];
    console.log(this.id)
    });
    
    this.getCurrentBook();
    
    // this.getStates(); 
    
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

  // getStates(){
  //   this.stateService.getStatesList().subscribe((data:Estado[])=>{
  //     this.estados = data;
  //   })
  // }
  

}
