import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AjouterassignmentComponent } from './Enseignant/assignment/ajouterassignment/ajouterassignment.component';
import { TemplateEtudiantComponent } from './Etudiant/template-etudiant/template-etudiant.component';
import { TemplateEnseignantComponent } from './Enseignant/template-enseignant/template-enseignant.component';
import { authGuard } from './shared/guard/auth.guard';
import { loginGuard } from './shared/guard/login.guard';
import { ListeassignmentComponent } from './Enseignant/assignment/listeassignment/listeassignment.component';
import { EditeassignmentComponent } from './Enseignant/assignment/editeassignment/editeassignment.component';
import { DetailAssignmentComponent } from './Enseignant/assignment/detail-assignment/detail-assignment.component';
import { ProfileComponent } from './Enseignant/profile/profile.component';
import { DetailAssignmenteleveComponent } from './Enseignant/assignmenteleve/detail-assignmenteleve/detail-assignmenteleve.component';

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
      {
        path: 'listeassignment', component: ListeassignmentComponent
      },
      {
        path: 'editeassignment/:id', component: EditeassignmentComponent
      },
      {
        path: 'detailassignment/:id', component: DetailAssignmentComponent
      },
      {
        path: 'detailassignmenteleve/:id', component: DetailAssignmenteleveComponent
      },
      {
        path: 'profile', component: ProfileComponent
      }
    ],
  }
];
