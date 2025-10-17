import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { HeaderAdminComponent } from '../../shared/headers/header-admin/header-admin.component';
import { RouterLink } from '@angular/router';
import { Libro } from '../../../interfaces/libro';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { UpdateBookComponent } from '../../../modals/book/update-book/update-book.component';
import { MatDialog } from '@angular/material/dialog';
import { Genero } from '../../../interfaces/genero';
import { GenreService } from '../../../services/genre-service';


@Component({
  selector: 'app-admin-genres',
  standalone: true,
  imports: [RouterLink, HeaderAdminComponent, MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule],
  templateUrl: './admin-genres.component.html',
  styleUrl: './admin-genres.component.css'
})
export class AdminGenresComponent implements OnInit, AfterViewInit {
  generos!: Genero[];
  showBooksTable: Boolean = true;
  totalItems = 0;
  pageSize = 16;
  pageIndex = 0;
  dataSource = new MatTableDataSource<Genero>();
  displayedColumns: string[] = ['genre', 'edit'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filteredBooks!: any[];
  

  constructor(
    // private route: ActivatedRoute,
    private genreService: GenreService,
    private paginatorIn: MatPaginatorIntl

  ) { }

  ngOnInit(): void {

    this.getGenres();



  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    
    this.translatePaginator();
    this.filterByItem();
    
  }

  getGenres(){
      this.genreService.getGenresByNameOrder().subscribe((data:Genero[])=>{
          this.generos = data;
          this.dataSource.data = this.generos;
        })
  
      }

 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //sin lo de abajo funciona
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    
  }
  //filtrar dataSource por cuatro campos y datos de tablas externas
  filterByItem(){
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.nombre.toLowerCase().includes(filter);
    }
  }
//filtro para vista sin dataSource, busca en this.libros
applyFilterGalery(event: Event){
  const filterValue = (event.target as HTMLInputElement).value;
  
  this.filteredBooks=this.generos.filter(genero=>genero.nombre.includes(filterValue));
  this.totalItems=this.filteredBooks.length;
}

  onPageChange(event: PageEvent): void {

    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    

  }
  

  translatePaginator() {
    this.paginatorIn.itemsPerPageLabel = "Resultados por página";
    this.paginatorIn.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0) {
        
        return `Página 1 de 1`;
      }
      const totalPaginas = Math.ceil(length / pageSize);
      return `Página ${page + 1} de ${totalPaginas}`;
    }
  }

  readonly dialog = inject(MatDialog);
  openDialog(libro:Libro,enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(UpdateBookComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
        disableClose: true,
        data:libro.id
        
      }).afterClosed().subscribe((data: Libro)=>{
        
       
  
        
        
        this.getGenres();
      });
    }

}
