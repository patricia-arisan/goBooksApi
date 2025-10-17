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
  dataSource = new MatTableDataSource<Libro>();
  displayedColumns: string[] = ['author', 'edit'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filteredBooks!: any[];
  nLibros!:number;
  autores!: AutorDTO[];
  autoress!: Autor[];

  constructor(
    // private route: ActivatedRoute,
    private bookService: BookService,
    private paginatorIn: MatPaginatorIntl,
    private authorService: AuthorService

  ) { }

  ngOnInit(): void {

    this.getBooks();
    this.getNumberOfBooksByAuthor();
   


  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    
    this.translatePaginator();
    this.filterByItem();
    
  }

  getBooks() {
    this.bookService.getBooksByNameOrder().subscribe((data: Libro[]) => {
      this.libros = data;
      this.totalItems=this.libros.length;
      this.dataSource.data = this.libros;
      
      

    })
    

  }

   getNumberOfBooksByAuthor(){
      this.authorService.getListBookAuthorNumber().subscribe((data:AutorDTO[])=>{
          this.autores = data;
          console.log(this.autores)
          
          
          
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
      return data.nombre.toLowerCase().includes(filter) || data.autor.nombre.toLowerCase().includes(filter) || data.editorial.nombre.toLowerCase().includes(filter) || data.genero.nombre.toLowerCase().includes(filter);
    }
  }
//filtro para vista sin dataSource, busca en this.libros
applyFilterGalery(event: Event){
  const filterValue = (event.target as HTMLInputElement).value;
  
  this.filteredBooks=this.libros.filter(libro=>libro.nombre.includes(filterValue));
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
        
       
  
        
        
        this.getBooks();
      });
    }

}
