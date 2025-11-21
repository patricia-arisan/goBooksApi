import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../../services/user-service';


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
    private userService: UserService
    
  ){}

  logout(){
    this.userService.logoutUser().subscribe(()=>{
      localStorage.clear();
      this.router.navigate(['/login']);
    });
    
  }
}
