import { Component } from '@angular/core';
import { HeaderAdminComponent } from '../../shared/headers/header-admin/header-admin.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-books',
  standalone: true,
  imports: [RouterLink,HeaderAdminComponent],
  templateUrl: './admin-books.component.html',
  styleUrl: './admin-books.component.css'
})
export class AdminBooksComponent {

}
