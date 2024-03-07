import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    const router= inject(Router)

    const sessionData = localStorage.getItem(environment.UTILISATEUR_SESSION_KEY);
    if (sessionData != null) {
     return true;
    }else{
      router.navigateByUrl("login");
      return false;
    }
};

