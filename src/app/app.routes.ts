import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { InscriptionComponent } from './inscription/inscription/inscription.component';
import { AjouterassignmentComponent } from './assignment/ajouterassignment/ajouterassignment/ajouterassignment.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'ajouterassignment', component: AjouterassignmentComponent },
];
