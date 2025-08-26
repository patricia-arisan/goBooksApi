import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { Usuario } from '../../interfaces/usuario';
import { ReadingService } from '../../services/reading-service';
import { Lectura } from '../../interfaces/lectura';
import { HeaderUserComponent } from '../shared/headers/header-user/header-user.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-readings',
  standalone: true,
  imports: [RouterLink,HeaderUserComponent],
  templateUrl: './readings.component.html',
  styleUrl: './readings.component.css'
})
export class ReadingsComponent implements OnInit{
  user!: Usuario;
  lecturas!: Lectura[];
  
  constructor(
    private userService: ServicesService,
    private readingService: ReadingService,
    
    
  ){}

  ngOnInit(): void {
    this.retrieveFromLocalStorage();
    this.getReadings();
    
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

      getReadings(){
        this.readingService.getReadingsByUser(this.user.id).subscribe((data:Lectura[])=>{
                    this.lecturas = data;
                    console.log(this.lecturas)
                  })
      }

      getReadingsByState(idEstado: number){
        this.readingService.getReadingsByUserState(this.user.id, idEstado).subscribe((data:Lectura[])=>{
                    this.lecturas = data;
                    console.log(this.lecturas)
                  })
      }

}
