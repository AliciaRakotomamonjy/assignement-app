import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AjouterassignmentComponent } from './Enseignant/assignment/ajouterassignment/ajouterassignment.component';
import { TemplateEtudiantComponent } from './Etudiant/template-etudiant/template-etudiant.component';
import { TemplateEnseignantComponent } from './Enseignant/template-enseignant/template-enseignant.component';
import { professeurGuard } from './shared/guard/professeur.guard';
import { loginGuard } from './shared/guard/login.guard';
import { ListeassignmentComponent } from './Enseignant/assignment/listeassignment/listeassignment.component';
import { EditeassignmentComponent } from './Enseignant/assignment/editeassignment/editeassignment.component';
import { LesdevoirsComponent } from './Etudiant/devoir/lesdevoirs/lesdevoirs.component';
import { etudiantGuard } from './shared/guard/etudiant.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'inscription', component: InscriptionComponent, canActivate: [loginGuard] },
  {
    path: 'accueil_Etudiant', component: TemplateEtudiantComponent, canActivate: [etudiantGuard],
    children:[
      {
        path: 'les_devoirs', component: LesdevoirsComponent
      }
    ]
  },
  {
    path: 'accueil_Enseignant', component: TemplateEnseignantComponent, canActivate: [professeurGuard],
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
    ],
  }
];
