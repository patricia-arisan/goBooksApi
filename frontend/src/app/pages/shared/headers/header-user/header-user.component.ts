import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../../services/user-service';
import { Usuario } from '../../../../interfaces/usuario';


@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.css'
})
export class HeaderUserComponent implements OnInit{
  user!: Usuario;

  constructor(
    private router: Router,
    private userService: UserService
    
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
}
