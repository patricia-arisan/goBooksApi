import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../interfaces/usuario';
import { ReadingService } from '../../services/reading-service';
import { Lectura } from '../../interfaces/lectura';
import { HeaderUserComponent } from '../shared/headers/header-user/header-user.component';
import { RouterLink } from '@angular/router';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { UserService } from '../../services/user-service';

/**
 * Componente para ver las lecturas agregadas por el usuario
 */
@Component({
  selector: 'app-readings',
  standalone: true,
  imports: [RouterLink, HeaderUserComponent, MatPaginatorModule],
  templateUrl: './readings.component.html',
  styleUrl: './readings.component.css'
})
export class ReadingsComponent implements OnInit {
  user!: Usuario;
  readings!: Lectura[];
  // Controles del paginator
  totalItems = 0;
  pageSize = 16;
  pageIndex = 0;

  constructor(
    private userService: UserService,
    private readingService: ReadingService,
    private paginator: MatPaginatorIntl
  ) {}
  /**
   * Obtencion del listado de tadas las lecturas al iniciar el componente
   * Cambio de idioma a mostrar del paginator
   */
  ngOnInit(): void {
    this.getReadings();   
    this.translatePaginator();
  }

  // Funcion para obtener todas las lecturas del usuario
  getReadings() {  
    // Obtencion del id del usuario del localStorage
    let value = this.userService.getItem('id'); 
    let currentUser = 0;
    if (value !== null) {  
      currentUser = parseInt(value);
      // Obtencion de todas las lecturas del usuario con el servicio de lectura
      this.readingService.getReadingsByUser(currentUser).subscribe((data: Lectura[]) => {
        this.readings = data;
        // Guardado del total de elementos del listado para la posterior paginacion
        this.totalItems = this.readings.length;
      }); 
    }   
  }

  getReadingsByState(idState: number) {
    // Obtencion del id del usuario del localStorage
    let value = this.userService.getItem('id'); 
    let currentUser = 0;
    if (value !== null) {
      currentUser = parseInt(value);
      // Obtencion de las lecturas del usuario segun su estado con el servicio de lectura
      this.readingService.getReadingsByUserState(currentUser, idState).subscribe((data: Lectura[]) => {
        this.readings = data;
        // Guardado del total de elementos del listado para la posterior paginacion
        this.totalItems = this.readings.length;
      });
    }
  }

  // Funcion para cambiar el idioma y personalizar el paginator
  translatePaginator() {
    // Cambio del texto del selector
    this.paginator.itemsPerPageLabel = "Resultados por página";
    // Texto del conteo de paginas existentes en funcion de los elementos mostrados de la lista
    this.paginator.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0) {
        return `Página 1 de 1`;
      }
      const totalPaginas = Math.ceil(length / pageSize);
      return `Página ${page + 1} de ${totalPaginas}`;
    }
  }

  // Funcion para detectar los cambios de pagina y en los elementos a mostrar por el paginator
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

}