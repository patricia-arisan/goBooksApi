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
import { GeneroDTO } from '../../../interfaces/generoDTO';
import { GenreUpdateComponent } from '../../../modals/genre/genre-update/genre-update.component';
import { EditorialDTO } from '../../../interfaces/editorialDTO';
import { EditorialService } from '../../../services/editorial-service';
import { UpdatePublisherComponent } from '../../../modals/editorial/update-publisher/update-publisher.component';
import { Editorial } from '../../../interfaces/editorial';
import { DeletePublisherComponent } from '../../../modals/editorial/delete-publisher/delete-publisher.component';


@Component({
  selector: 'app-admin-publishers',
  standalone: true,
  imports: [RouterLink, HeaderAdminComponent, MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule],
  templateUrl: './admin-publishers.component.html',
  styleUrl: './admin-publishers.component.css'
})
export class AdminPublishersComponent implements OnInit, AfterViewInit {
  editoriales!: EditorialDTO[];
  showBooksTable: Boolean = true;
  totalItems = 0;
  pageSize = 16;
  pageIndex = 0;
  dataSource = new MatTableDataSource<EditorialDTO>();
  displayedColumns: string[] = ['publisher', 'books','edit','delete'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filteredBooks!: any[];
  

  constructor(
    // private route: ActivatedRoute,
    private publisherService: EditorialService,
    private paginatorIn: MatPaginatorIntl

  ) { }

  ngOnInit(): void {

    // this.getGenres();
    this.getNumberOfBooksByPublisher();


  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    
    this.translatePaginator();
    this.filterByItem();
    
  }

  // getGenres(){
  //     this.genreService.getGenresByNameOrder().subscribe((data:Genero[])=>{
  //         this.generos = data;
  //         this.dataSource.data = this.generos;
  //       })
  
  //     }
getNumberOfBooksByPublisher(){
      this.publisherService.getListBookPublisherNumber().subscribe((data:EditorialDTO[])=>{
          this.editoriales = data;
          this.dataSource.data=this.editoriales;
          
          
          
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
      return data.nombre.toLowerCase().includes(filter) || data.numeroLibros.toString().includes(filter);
    }
  }
//filtro para vista sin dataSource, busca en this.libros
// applyFilterGalery(event: Event){
//   const filterValue = (event.target as HTMLInputElement).value;
  
//   this.filteredBooks=this.generos.filter(genero=>genero.nombre.includes(filterValue));
//   this.totalItems=this.filteredBooks.length;
// }

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
   openDialog(editorial:EditorialDTO,enterAnimationDuration: string, exitAnimationDuration: string): void {
     
       this.dialog.open(UpdatePublisherComponent, {
         width: '250px',
         enterAnimationDuration,
         exitAnimationDuration,
         disableClose: true,
         data:editorial.idEditorial
         
       }).afterClosed().subscribe((data: Editorial)=>{
         
        
   
         
         
         // this.getBooks();
         this.getNumberOfBooksByPublisher();
       });
      }

      openDeleteDialog(editorial:EditorialDTO,enterAnimationDuration: string, exitAnimationDuration: string): void {
              this.dialog.open(DeletePublisherComponent, {
                width: '350px',
                enterAnimationDuration,
                exitAnimationDuration,
                disableClose: true,
                data:editorial.idEditorial
              }).afterClosed().subscribe((reloadView:boolean) => { 
        if(reloadView) window.location.reload(); 
      } )
            }

}
