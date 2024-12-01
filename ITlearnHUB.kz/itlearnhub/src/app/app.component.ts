import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'itlearnhub';
  showNavbar: boolean = true;
  user: { role: 'visitor' | 'student' | 'teacher'; name: string } | null = null;

  constructor(private router: Router, public authService: AuthService) {
    // Подписываемся на события роутера
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Показать или скрыть navbar в зависимости от текущего маршрута
        this.showNavbar = !event.url.includes('/register');
      }
    });
  }

  ngOnInit(): void {
    // Инициализация пользователя
    this.user = this.authService.getCurrentUser();
  }

  switchToVisitor() {
    this.authService.setRole('visitor');
    this.user = this.authService.getCurrentUser();
  }

  switchToStudent() {
    this.authService.setRole('student');
    this.user = this.authService.getCurrentUser();
  }

  switchToTeacher() {
    this.authService.setRole('teacher');
    this.user = this.authService.getCurrentUser();
  }
  
}
