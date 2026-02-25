import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '../../services/user-service';

/**
 * Guard para proteger las rutas propias de los usuarios autenticados
 */
export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean | UrlTree => {
  const userService = inject(UserService);
  const router = inject(Router);
  // Comprobacion de autenticacion
  if (userService.isAuthenticated()) {
    return true;
  } else {
    // Si no logra loguearse, se redirige a la pagina de login
    return router.createUrlTree(['/login']);
  }
}