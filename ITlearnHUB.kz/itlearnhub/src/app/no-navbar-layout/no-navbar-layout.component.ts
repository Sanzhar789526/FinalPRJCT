import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-no-navbar-layout',
  templateUrl: './no-navbar-layout.component.html',
  styleUrls: ['./no-navbar-layout.component.css'],
  standalone: true,
  imports: [RouterModule],  // Импортируем RouterModule
})
export class NoNavbarLayoutComponent {}