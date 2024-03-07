import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AjouterassignmentComponent } from './Enseignant/assignment/ajouterassignment/ajouterassignment.component';
import { TemplateEtudiantComponent } from './Etudiant/template-etudiant/template-etudiant.component';
import { TemplateEnseignantComponent } from './Enseignant/template-enseignant/template-enseignant.component';
import { authGuard } from './shared/guard/auth.guard';
import { loginGuard } from './shared/guard/login.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'inscription', component: InscriptionComponent, canActivate: [loginGuard] },
  {
    path: 'accueil_Etudiant', component: TemplateEtudiantComponent, canActivate: [authGuard],
  },
  {
    path: 'accueil_Enseignant', component: TemplateEnseignantComponent, canActivate: [authGuard],
    children: [
      {
        path: 'ajouterassignment', component: AjouterassignmentComponent
      },
    ],
  }
];
