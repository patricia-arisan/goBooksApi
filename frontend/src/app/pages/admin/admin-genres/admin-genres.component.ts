import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { HeaderAdminComponent } from '../../shared/headers/header-admin/header-admin.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Genero } from '../../../interfaces/genero';
import { GenreService } from '../../../services/genre-service';
import { GeneroDTO } from '../../../interfaces/generoDTO';
import { GenreUpdateComponent } from '../../../modals/genre/genre-update/genre-update.component';
import { DeleteGenreComponent } from '../../../modals/genre/genre-delete/delete-genre.component';

/**
 * Componente de Administrar generos 
 */
@Component({
  selector: 'app-admin-genres',
  standalone: true,
  imports: [HeaderAdminComponent, MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule],
  templateUrl: './admin-genres.component.html',
  styleUrl: './admin-genres.component.css'
})
export class AdminGenresComponent implements OnInit, AfterViewInit {
  generos!: GeneroDTO[];
  // Controles del paginator
  totalItems = 0;
  pageSize = 16;
  pageIndex = 0;
  // Configuraciones de la tabla y el paginador
  dataSource = new MatTableDataSource<GeneroDTO>();
  displayedColumns: string[] = ['genre', 'books', 'edit', 'delete'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private genreService: GenreService,
    private paginatorIn: MatPaginatorIntl
  ) {}

  /**
   * Obtencion del listado de generos y su numero de libros al iniciar el componente
   * Definicion de la busqueda personalizada
   */ 
  ngOnInit(): void {
    this.getNumberOfBooksByGenre();
    this.filterByItem();
  }

  /**
   * Vinculacion del paginator con el listado de generos del dataSource
   * Cambio de idioma a mostrar del paginator 
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    this.translatePaginator();
  }

  // Funcion para listar los generos por orden alfabetico y con su numero de libros asociados
  getNumberOfBooksByGenre() {
    this.genreService.getListBookGenreNumber().subscribe((data: GeneroDTO[]) => {
      this.generos = data;
      this.dataSource.data = this.generos;
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

  // Funcion para abrir el componente para editar al genero
  openDialog(genero: GeneroDTO, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(GenreUpdateComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      // Envio del id del genero
      data: genero.idGenero
    }).afterClosed().subscribe((data: Genero) => {
      // Carga del listado de generos
      this.getNumberOfBooksByGenre();
    });
  }

  // Funcion para abrir el componente para eliminar al genero
  openDeleteDialog(genero: GeneroDTO, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeleteGenreComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: genero.idGenero
    }).afterClosed().subscribe((reloadView: boolean) => {
      // Si el dialog devuelve un true al cerrarse, la pagina se actualiza para mostrar el nuevo listado
      if (reloadView) window.location.reload();
    });
  }
}