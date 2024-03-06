import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AjouterassignmentComponent } from './assignment/ajouterassignment/ajouterassignment/ajouterassignment.component';
import { TemplateEtudiantComponent } from './template-etudiant/template-etudiant.component';
import { TemplateEnseignantComponent } from './template-enseignant/template-enseignant.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'accueil_Etudiant', component: TemplateEtudiantComponent },
  {
    path: 'accueil_Enseignant', component: TemplateEnseignantComponent,
    children: [
      {
        path: 'ajouterassignment', component: AjouterassignmentComponent
      },
    ]
  }
];
