import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


////
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { Usuario } from '../../../interfaces/usuario';
import { Libro } from '../../../interfaces/libro';
import { ServicesService } from '../../../services/services.service';
import { BookService } from '../../../services/book-service';
import { HeaderAdminComponent } from '../../shared/headers/header-admin/header-admin.component';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [RouterLink,HeaderAdminComponent,FormsModule, ReactiveFormsModule,MatPaginatorModule], ///FormsModule, ReactiveFormsModule
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit{
  user!: Usuario;   
  libros!: Libro[];
  totalItems = 0;
  pageSize = 16;
  pageIndex = 0;
  ///////////
  // busqueda!: Search[]
  busqueda!:string;

constructor(
    
    private router: Router,
    private userService: ServicesService,
    private bookService: BookService,
    private paginator: MatPaginatorIntl,
    private formBuilder: FormBuilder,
   
  ){}

  ngOnInit(): void {
   
    this.retrieveFromLocalStorage();
    this.getAllLastBooks();
    this.translatePaginator();

    //////
    this.formSearch = this.formBuilder.group ({
      
      clave:[""],
      
      
    });
    

  }

  ////
  formSearch:FormGroup = new FormGroup({
    
    clave: new FormControl(""),
    
  })
  /////
  

  retrieveFromLocalStorage() {
    
    this.user = JSON.parse(localStorage.getItem('usuario') || '')
    //this.user = JSON.parse(localStorage.getItem('usuario') || '')
    let value = this.userService.getItem('id');
    //let credentials = localStorage.getItem('token') || ''
  //   let credentials = localStorage.getItem('token') || ''
  //let cred = JSON.stringify(credentials);
    console.log("Value antes de current: " + value)
   
    let currentUser = 0;
    if(value!==null){ //en angular ===
      currentUser = parseInt(value);
      console.log("STRING A INT" + currentUser);
      
      //this.userService.getLoggedUser(currentUser,this.user).subscribe((data:Usuario)=>{
      
      this.userService.getLoggedUser(currentUser).subscribe((data:Usuario)=>{
        
        this.user = data;
        console.log("DATOS HOME " + this.user);
        console.log("Local" + this.user.id);
        
      });
      
    }
    
    console.log(currentUser);
    
  }
  getAllLastBooks(){
      this.bookService.getAllLastBooks().subscribe((data:Libro[])=>{
              this.libros = data;
              this.totalItems=this.libros.length;
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

  //////////////
  search(){
    let busqueda = this.formSearch.get('clave')?.value;
    
    this.router.navigate(['results/search',busqueda]); 
   
    
  
      
    
  }
  // search(){
  //   let busqueda = this.formSearch.get('clave')?.value;
    
  //   this.bookService.searchByBookAuthorEditorial(busqueda).subscribe((data:Libro[]) =>{
  //     this.libros=data;
  //     this.router.navigate(['results/search']);
  //   })
//}
  
  //////////////////////////


  
  
}
