import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ServicesService } from '../../../../services/services.service';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent {
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
