import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '../../services/user-service';

/**
 * Guard para proteger las rutas propias del administrador
 */
export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean | UrlTree => {
  const userService = inject(UserService);
  const router = inject(Router);
  // Comprobacion del rol de administrador del usuario
  if (userService.isAdmin()) {
    return true;
  } else {
    // Si no es administrador, se redigira al usuario a la Home de usuario
    return router.createUrlTree(['/home']);
  }
}