import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { HeaderAdminComponent } from '../../shared/headers/header-admin/header-admin.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AuthorService } from '../../../services/author-service';
import { Autor } from '../../../interfaces/autor';
import { AutorDTO } from '../../../interfaces/autorDTO';
import { AuthorUpdateComponent } from '../../../modals/author/author-update/author-update.component';
import { AuthorDeleteComponent } from '../../../modals/author/author-delete/author-delete.component';

/**
 * Componente de Administrar autores 
 */
@Component({
  selector: 'app-admin-authors',
  standalone: true,
  imports: [HeaderAdminComponent, MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule],
  templateUrl: './admin-authors.component.html',
  styleUrl: './admin-authors.component.css'
})
export class AdminAuthorsComponent implements OnInit, AfterViewInit {
  autores!: AutorDTO[];
  // Controles del paginator
  totalItems = 0;
  pageSize = 16;
  pageIndex = 0;
  // Configuraciones de la tabla y el paginador
  dataSource = new MatTableDataSource<AutorDTO>();
  displayedColumns: string[] = ['author', 'books', 'edit', 'delete'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;  

  constructor(
    private paginatorIn: MatPaginatorIntl,
    private authorService: AuthorService
  ) {}

  /**
   * Obtencion del listado de autores y su numero de libros al iniciar el componente
   * Definicion de la busqueda personalizada
   */  
  ngOnInit(): void {
    this.getNumberOfBooksByAuthor();
    this.filterByItem();
  }

  /**
   * Vinculacion del paginator con el listado de autores del dataSource
   * Cambio de idioma a mostrar del paginator 
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    this.translatePaginator();    
  }

  // Funcion para listar los autores por orden alfabetico y con su numero de libros asociados
  getNumberOfBooksByAuthor() {
    this.authorService.getListBookAuthorNumber().subscribe((data: AutorDTO[]) => {
      this.autores = data;
      this.dataSource.data = this.autores;
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

  // Funcion para abrir el componente para editar al autor
  openUpdateDialog(autor: AutorDTO, enterAnimationDuration: string, exitAnimationDuration: string): void {
    console.log(autor.idAutor)
    this.dialog.open(AuthorUpdateComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      // Envio del id del autor
      data: autor.idAutor
    }).afterClosed().subscribe((data: Autor) => {   
      // Carga del listado de autores   
      this.getNumberOfBooksByAuthor();
    });
  }

  // Funcion para abrir el componente para eliminar al autor
  openDeleteDialog(autor: AutorDTO, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AuthorDeleteComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: autor.idAutor
    }).afterClosed().subscribe((reloadView: boolean) => {
      // Si el dialog devuelve un true al cerrarse, la pagina se actualiza para mostrar el nuevo listado
      if (reloadView) window.location.reload();
    });
  }

}