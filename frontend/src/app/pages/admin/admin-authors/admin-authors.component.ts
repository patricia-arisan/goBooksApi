import { AfterViewInit, Component, inject, numberAttribute, OnInit, ViewChild } from '@angular/core';
import { HeaderAdminComponent } from '../../shared/headers/header-admin/header-admin.component';
import { RouterLink } from '@angular/router';
import { BookService } from '../../../services/book-service';
import { Libro } from '../../../interfaces/libro';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { UpdateBookComponent } from '../../../modals/book/update-book/update-book.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthorService } from '../../../services/author-service';
import { Autor } from '../../../interfaces/autor';
import { AutorDTO } from '../../../interfaces/autorDTO';
import { AuthorUpdateComponent } from '../../../modals/author/author-update/author-update.component';


@Component({
  selector: 'app-admin-authors',
  standalone: true,
  imports: [RouterLink, HeaderAdminComponent, MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule],
  templateUrl: './admin-authors.component.html',
  styleUrl: './admin-authors.component.css'
})
export class AdminAuthorsComponent implements OnInit, AfterViewInit {
  libros!: Libro[];
  showBooksTable: Boolean = true;
  totalItems = 0;
  pageSize = 16;
  pageIndex = 0;
  // dataSource = new MatTableDataSource<Libro>();
  dataSource = new MatTableDataSource<AutorDTO>();
  displayedColumns: string[] = ['author', 'books','edit','delete'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filteredBooks!: any[];
  
  autores!: AutorDTO[];
  

  constructor(
    // private route: ActivatedRoute,
    private bookService: BookService,
    private paginatorIn: MatPaginatorIntl,
    private authorService: AuthorService

  ) { }

  ngOnInit(): void {

    
    this.getNumberOfBooksByAuthor();
   
}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    
    this.translatePaginator();
    this.filterByItem();
    
  }


   getNumberOfBooksByAuthor(){
      this.authorService.getListBookAuthorNumber().subscribe((data:AutorDTO[])=>{
          this.autores = data;
          this.dataSource.data=this.autores;
          
          
          
        })
    }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    
  }
  //filtrar dataSource por dos campos
  filterByItem(){
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.nombre.toLowerCase().includes(filter) || data.numeroLibros.toString().includes(filter);
    }
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
  openDialog(autor:AutorDTO,enterAnimationDuration: string, exitAnimationDuration: string): void {
    console.log(autor.idAutor)
      this.dialog.open(AuthorUpdateComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
        disableClose: true,
        data:autor.idAutor
        
      }).afterClosed().subscribe((data: Autor)=>{
        
       
  
        
        
        // this.getBooks();
        this.getNumberOfBooksByAuthor();
      });
    }

}
