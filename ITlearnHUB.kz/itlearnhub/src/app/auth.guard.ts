import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const allowedRoles: string[] = route.data['roles']; // Получаем список разрешённых ролей из маршрута
    const currentRole = this.authService.getRole(); // Получаем текущую роль пользователя

    // Проверяем, есть ли текущая роль в списке разрешённых
    if (allowedRoles.includes(currentRole)) {
      return true; // Доступ разрешён
    }

    // Если роль не соответствует, перенаправляем на другую страницу
    this.router.navigate(['/access-denied']);
    return false;
  }
}
