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
import { DetailAssignmentComponent } from './Enseignant/assignment/detail-assignment/detail-assignment.component';
import { ProfileComponent } from './Enseignant/profile/profile.component';
import { DetailAssignmenteleveComponent } from './Enseignant/assignmenteleve/detail-assignmenteleve/detail-assignmenteleve.component';
import { LesdevoirsComponent } from './Etudiant/devoir/lesdevoirs/lesdevoirs.component';
import { etudiantGuard } from './shared/guard/etudiant.guard';
import { FairedevoirComponent } from './Etudiant/devoir/fairedevoir/fairedevoir.component';
import { MesDevoirsComponent } from './Etudiant/devoir/mes-devoirs/mes-devoirs.component';
import { DetailDevoirComponent } from './Etudiant/devoir/detail-devoir/detail-devoir.component';
import { ProfileEtudiantComponent } from './Etudiant/profile-etudiant/profile-etudiant.component';
import { ModifierProfileEtudiantComponent } from './Etudiant/profile-etudiant/modifier-profile-etudiant/modifier-profile-etudiant.component';
import { ModificationProfileComponent } from './Enseignant/profile/modification-profile/modification-profile.component';
import { StatisticsComponent } from './Etudiant/statistics/statistics.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'inscription', component: InscriptionComponent, canActivate: [loginGuard] },
  {
    path: 'accueil_Etudiant', component: TemplateEtudiantComponent, canActivate: [etudiantGuard],
    children:[
      {
        path: '',
        redirectTo: 'les_devoirs',
        pathMatch: 'full'
      },
      {
        path: 'les_devoirs', component: LesdevoirsComponent
      },
      {
        path: 'faire_assignment/:id', component: FairedevoirComponent
      },
      {
        path: 'mesdevoirs', component: MesDevoirsComponent
      },
      {
        path: 'detailassignmenteleve/:id', component: DetailDevoirComponent
      },
      {
        path: 'profile', component: ProfileEtudiantComponent
      },
      {
        path: 'modifier_profile', component: ModifierProfileEtudiantComponent
      },
      {
        path: 'stats', component: StatisticsComponent
      },

    ]
  },
  {
    path: 'accueil_Enseignant', component: TemplateEnseignantComponent, canActivate: [professeurGuard],
    children: [
      {
        path: '',
        redirectTo: 'listeassignment',
        pathMatch: 'full'
      },
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
      },
      {
        path: 'modificationprofile', component: ModificationProfileComponent
      },
    ],
  }
];
