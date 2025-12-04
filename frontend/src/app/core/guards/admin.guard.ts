import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '../../services/user-service';

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean | UrlTree => {
  const userService = inject(UserService);
  const router = inject(Router);
  if (userService.isAdmin()) {
    return true;
  } else {
    return router.createUrlTree(['/home']);
  }
}

