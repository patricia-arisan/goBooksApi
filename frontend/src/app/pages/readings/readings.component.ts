import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { Usuario } from '../../interfaces/usuario';
import { ReadingService } from '../../services/reading-service';
import { Lectura } from '../../interfaces/lectura';
import { HeaderUserComponent } from '../shared/headers/header-user/header-user.component';
import { RouterLink } from '@angular/router';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-readings',
  standalone: true,
  imports: [RouterLink, HeaderUserComponent, MatPaginatorModule],
  templateUrl: './readings.component.html',
  styleUrl: './readings.component.css'
})
export class ReadingsComponent implements OnInit {
  user!: Usuario;
  lecturas!: Lectura[];
  totalItems = 0;
  pageSize = 16;
  pageIndex = 0;

  constructor(
    private userService: ServicesService,
    private readingService: ReadingService,
    private paginator: MatPaginatorIntl

  ) { }

  ngOnInit(): void {
    this.retrieveFromLocalStorage();
    this.getReadings();
    this.translatePaginator();

  }

  retrieveFromLocalStorage() {
    this.user = JSON.parse(localStorage.getItem('usuario') || '')

    let value = this.userService.getItem('id');

    let currentUser = 0;
    if (value != null) {
      currentUser = parseInt(value);

      this.userService.getLoggedUser(currentUser).subscribe((data: Usuario) => {

        this.user = data;


      });
    }

  }

  getReadings() {
    this.readingService.getReadingsByUser(this.user.id).subscribe((data: Lectura[]) => {
      this.lecturas = data;
      console.log(this.lecturas)
      this.totalItems=this.lecturas.length;
    })
  }

  getReadingsByState(idEstado: number) {
    this.readingService.getReadingsByUserState(this.user.id, idEstado).subscribe((data: Lectura[]) => {
      this.lecturas = data;
      console.log(this.lecturas)
      this.totalItems=this.lecturas.length;
    })
  }

  translatePaginator() {
    this.paginator.itemsPerPageLabel = "Resultados por página";
    this.paginator.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0) {
        return `Página 1 de 1`;
      }
      const totalPaginas = Math.ceil(length / pageSize);
      return `Página ${page + 1} de ${totalPaginas}`;
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

}
