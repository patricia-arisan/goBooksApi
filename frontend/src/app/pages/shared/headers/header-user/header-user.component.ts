import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ServicesService } from '../../../../services/services.service';

@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.css'
})
export class HeaderUserComponent {
  
  constructor(
    private router: Router,
    private userService: ServicesService
    
  ){}

  logout(){
    this.userService.logoutUser().subscribe(()=>{
      localStorage.clear();
      this.router.navigate(['/login']);
    });
    
  }
}
