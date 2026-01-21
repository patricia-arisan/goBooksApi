import { Component, ElementRef, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../../services/user-service';
import { Usuario } from '../../../../interfaces/usuario';


@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent {
  user!: Usuario;
  showMenu: Boolean = true;
  showAccount: Boolean = true;
  
  constructor(
    private router: Router,
    private userService: UserService,
    private eRef: ElementRef
    
  ){}

  ngOnInit(): void {
  
      this.retrieveFromLocalStorage();
    }
  
  retrieveFromLocalStorage() {
  
      this.user = JSON.parse(localStorage.getItem('usuario') || '')
      //this.user = JSON.parse(localStorage.getItem('usuario') || '')
      let value = this.userService.getItem('id');
      //let credentials = localStorage.getItem('token') || ''
      //   let credentials = localStorage.getItem('token') || ''
      //let cred = JSON.stringify(credentials);
      console.log("Value antes de current: " + value)
  
      let currentUser = 0;
      if (value !== null) { //en angular ===
        currentUser = parseInt(value);
        console.log("STRING A INT" + currentUser);
  
        //this.userService.getLoggedUser(currentUser,this.user).subscribe((data:Usuario)=>{
  
        this.userService.getLoggedUser(currentUser).subscribe((data: Usuario) => {
  
          this.user = data;
          console.log("DATOS HOME " + this.user);
          console.log("Local" + this.user.id);
  
        });
  
      }
    }

  logout(){
    this.userService.logoutUser().subscribe(()=>{
      localStorage.clear();
      this.router.navigate(['/login']);
    });
    
  }

    toggleView(){ 
    this.showMenu = !this.showMenu;
    
    
    
    
  }

  toggleViewAccount(){ 
    this.showAccount = !this.showAccount;
    
    
    
    
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: Event) {
    // Cerrar deplegable al pinchar fuera de la lista
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showAccount = true;
    }

    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showMenu = true;
    }
  }
}
