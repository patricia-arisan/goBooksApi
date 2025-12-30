import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';


import { HeaderUserComponent } from '../../shared/headers/header-user/header-user.component';
import { Libro } from '../../../interfaces/libro';
import { BookService } from '../../../services/book-service';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { HeaderAdminComponent } from '../../shared/headers/header-admin/header-admin.component';
import { Usuario } from '../../../interfaces/usuario';
import { UserService } from '../../../services/user-service';
import { Editorial } from '../../../interfaces/editorial';
import { PublisherService } from '../../../services/publisher-service';



@Component({
  selector: 'app-results-publisher',
  standalone: true,
  imports: [RouterLink,HeaderUserComponent,HeaderAdminComponent,MatPaginatorModule],
  templateUrl: './results-publisher.component.html',
  styleUrl: './results-publisher.component.css'
})
export class ResultsPublisherComponent implements OnInit{
  user!: Usuario;
  libros!: Libro[];
  editorial!: Editorial;
  id!: string;
  totalItems = 0;
  pageSize = 16;
  pageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private paginator: MatPaginatorIntl,
    private userService: UserService,
    private publisherService: PublisherService  
    ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      
    
    });
    this.retrieveFromLocalStorage();
    this.getPublisher();
    this.getBooksByPublisher();
    this.translatePaginator();
  }

  retrieveFromLocalStorage() {
            this.user = JSON.parse(localStorage.getItem('usuario') || '')
            
            let value = this.userService.getItem('id');
               
            let currentUser = 0;
            if(value!=null){
              currentUser = parseInt(value);
                          
              this.userService.getLoggedUser(currentUser).subscribe((data:Usuario)=>{
                
                this.user = data;
                
                    
              });
            }  
          }

  getBooksByPublisher(){
    let idPublisher = parseInt(this.id);
    this.bookService.getBookByPublisherId(idPublisher).subscribe((data:Libro[])=>{
          this.libros = data;
          this.totalItems=this.libros.length;
          
        })
  }

  getPublisher(){
    let idPublisher = parseInt(this.id);
    this.publisherService.getPublisherById(idPublisher).subscribe((data:Editorial)=>{
      this.editorial = data;
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
