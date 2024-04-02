import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { inject } from '@angular/core';
import { UtilisateurService } from '../Services/utilisateur.service';

export const etudiantGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const utilisateurService = inject(UtilisateurService);

  const sessionData = localStorage.getItem(environment.UTILISATEUR_SESSION_KEY);
  if (sessionData != null) {
    const role = utilisateurService.getInfoFromToken("role");
    if (role == 'eleve') {
      return true;
    }
    router.navigateByUrl("login");
    return false;
  } else {
    router.navigateByUrl("login");
    return false;
  }
};
