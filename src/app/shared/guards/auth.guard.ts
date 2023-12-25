import {CanActivateFn, Router} from '@angular/router';
import {inject, InjectFlags} from "@angular/core";

import {AUTH_SERVICE} from "@tokens";

export const authGuard: CanActivateFn = () => {
  const authService = inject(AUTH_SERVICE, InjectFlags.Optional)
  const router = inject(Router)
  if (authService?.isAuthenticated()) {
    return true;
  }
  router.navigate(['/admin', 'login'])
  return false;

};
