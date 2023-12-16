import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {Router} from "@angular/router";

import {AUTH_SERVICE} from "@tokens";

export const authGuard: CanActivateFn = () => {
  const authService = inject(AUTH_SERVICE)
  const router = inject(Router)
  if (authService.isAuthenticated()) {
    return true;
  }
  router.navigate(['/admin', 'login'])
  return false;

};
