import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { UtilisateurService } from '../Services/utilisateur.service';


export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const utilisateurService = inject(UtilisateurService);
  const sessionData = localStorage.getItem(environment.UTILISATEUR_SESSION_KEY);
  const role = localStorage.getItem(environment.UTILISATEUR_ROLE_KEY);
  if (sessionData != null) {
    const role = utilisateurService.getRoleUtilisateur();
    if (role == 'prof') {
      router.navigateByUrl("accueil_Enseignant");
    }
    else{
      router.navigateByUrl("accueil_Etudiant");
    }
    return false;
  }
  else {
    return true;
  }
};
