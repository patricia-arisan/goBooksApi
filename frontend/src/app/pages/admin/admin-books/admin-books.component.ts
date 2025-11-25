import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { HeaderAdminComponent } from '../../shared/headers/header-admin/header-admin.component';
import { RouterLink } from '@angular/router';
import { BookService } from '../../../services/book-service';
import { Libro } from '../../../interfaces/libro';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { MatDialog } from '@angular/material/dialog';
import { BookUpdateComponent } from '../../../modals/book/book-update/book-update.component';


@Component({
  selector: 'app-admin-books',
  standalone: true,
  imports: [RouterLink, HeaderAdminComponent, MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule],
  templateUrl: './admin-books.component.html',
  styleUrl: './admin-books.component.css'
})
export class AdminBooksComponent implements OnInit, AfterViewInit {
  libros!: Libro[];
  showBooksTable: Boolean = true;
  totalItems = 0;
  pageSize = 16;
  pageIndex = 0;
  dataSource = new MatTableDataSource<Libro>();
  displayedColumns: string[] = ['name', 'author', 'publisher', 'genre', 'edit'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filteredBooks!: any[];
  url: string="/assets/icon/menu.png";
  url2: string="/assets/icon/list.png";

  constructor(
    // private route: ActivatedRoute,
    private bookService: BookService,
    private paginatorIn: MatPaginatorIntl

  ) { }

  ngOnInit(): void {

    this.getBooks();



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
      
      // this.dataSource = new MatTableDataSource(this.libros);

    })

  }

  toggleView(){ 
    this.showBooksTable = !this.showBooksTable;
    
    if(!this.showBooksTable){
      this.url=this.url2;
      
      
    }else{
      this.url="/assets/icon/menu.png";
      
      // this.totalItems=this.dataSource.data.length;
      // console.log(this.dataSource.data)
      setTimeout(() => this.dataSource.paginator = this.paginator);
    }
    
    
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
  
  this.filteredBooks=this.libros.filter(libro=>libro.nombre.toLowerCase().includes(filterValue));
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
      this.dialog.open(BookUpdateComponent, {
        width: '330px',
        enterAnimationDuration,
        exitAnimationDuration,
        disableClose: true,
        data:libro.id
        
      }).afterClosed().subscribe((data: Libro)=>{
        
       
  
        
        
        this.getBooks();
      });
    }

}
