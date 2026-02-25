import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '../../services/user-service';

/**
 * Guard para proteger las rutas propias del usuario
 */
export const userGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean | UrlTree => {
  const userService = inject(UserService);
  const router = inject(Router);
  // Comprobacion del rol de usuario
  if (userService.isUser()) {
    return true;
  } else {
    // Si no es usuario y es administrador, se redigira a la Home del administrador
    return router.createUrlTree(['/admin-home']);
  }
}

