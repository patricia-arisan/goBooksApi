import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { HeaderAdminComponent } from '../../shared/headers/header-admin/header-admin.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditorialDTO } from '../../../interfaces/editorialDTO';


import { Editorial } from '../../../interfaces/editorial';

import { PublisherService } from '../../../services/publisher-service';
import { PublisherUpdateComponent } from '../../../modals/publisher/publisher-update/publisher-update.component';
import { PublisherDeleteComponent } from '../../../modals/publisher/publisher-delete/publisher-delete.component';
import { Router } from '@angular/router';

/**
 * Componente de Administrar editoriales 
 */
@Component({
  selector: 'app-admin-publishers',
  standalone: true,
  imports: [HeaderAdminComponent, MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule],
  templateUrl: './admin-publishers.component.html',
  styleUrl: './admin-publishers.component.css'
})
export class AdminPublishersComponent implements OnInit, AfterViewInit {
  editoriales!: EditorialDTO[];
  // Configuraciones de la tabla y el paginador
  totalItems = 0;
  pageSize = 16;
  pageIndex = 0;
  // Configuraciones de la tabla y el paginador
  dataSource = new MatTableDataSource<EditorialDTO>();
  displayedColumns: string[] = ['publisher', 'books', 'edit', 'delete'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private publisherService: PublisherService,
    private paginatorIn: MatPaginatorIntl,
    private router: Router,
  ) {}

  /**
   * Obtencion del listado de editoriales y su numero de libros al iniciar el componente
   * Definicion de la busqueda personalizada
   */  
  ngOnInit(): void {
    this.getNumberOfBooksByPublisher();
    this.filterByItem();
  }

  /**
   * Vinculacion del paginator con el listado de editoriales del dataSource
   * Cambio de idioma a mostrar del paginator 
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    this.translatePaginator();
  }

  // Funcion para listar las editoriales por orden alfabetico y con su numero de libros asociados
  getNumberOfBooksByPublisher() {
    this.publisherService.getListBookPublisherNumber().subscribe((data: EditorialDTO[]) => {
      this.editoriales = data;
      this.dataSource.data = this.editoriales;
    });
  }

  // Funcion para filtrar en tiempo real en el dataSource
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Funcion para filtrar por algunos elementos
  filterByItem() {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.nombre.toLowerCase().includes(filter) || data.numeroLibros.toString().includes(filter);
    }
  }

  // Funcion para detectar los cambios de pagina y en los elementos a mostrar por el paginator
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }


  // Funcion para cambiar el idioma y personalizar el paginator
  translatePaginator() {
    // Cambio del texto del selector
    this.paginatorIn.itemsPerPageLabel = "Resultados por página";
    // Texto del conteo de paginas existentes en funcion de los elementos mostrados de la lista
    this.paginatorIn.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0) {
        return `Página 1 de 1`;
      }
      const totalPaginas = Math.ceil(length / pageSize);
      return `Página ${page + 1} de ${totalPaginas}`;
    }
  }

  // Inyeccion de dependencias para usar MatDialog
  readonly dialog = inject(MatDialog);

  // Funcion para abrir el componente para editar la editorial
  openDialog(editorial: EditorialDTO, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(PublisherUpdateComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      // Envio del id del editorial
      data: editorial.idEditorial
    }).afterClosed().subscribe((data: Editorial) => {
      // Carga del listado de editoriales
      this.getNumberOfBooksByPublisher();
    });
  }

  // Funcion para abrir el componente para eliminar la editorial
  openDeleteDialog(editorial: EditorialDTO, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(PublisherDeleteComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: editorial.idEditorial
    }).afterClosed().subscribe((reloadView: boolean) => {
      // Si el dialog devuelve un true al cerrarse, la pagina se actualiza para mostrar el nuevo listado
      if (reloadView) window.location.reload();
    });
  }

  // Funcion para dirigir al administrador a la pagina de resultados de libros de una editorial
    goPublisherBooks(editorial: EditorialDTO) {
      this.router.navigate(["/results/publisher", editorial.idEditorial]);
    }

}