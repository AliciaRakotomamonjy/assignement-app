import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Utilisateur } from '../../shared/models/utilisateur.model';
import { UtilisateurService } from '../../shared/Services/utilisateur.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-profile-etudiant',
  standalone: true,
  imports: [MatCard,MatCardContent,MatButtonModule, MatDividerModule, MatIconModule,
    RouterLink, RouterLinkActive],
  templateUrl: './profile-etudiant.component.html',
  styleUrl: './profile-etudiant.component.css'
})
export class ProfileEtudiantComponent implements OnInit {

  profile: Utilisateur | undefined;
  isLoading = true;
  URL_IMAGE=environment.API_URL+environment.IMAGE_API;
  img=""
  constructor(private utilisateurService: UtilisateurService){

  }

  ngOnInit(): void {
    this.profile = new Utilisateur();
    this.profile.nom = this.utilisateurService.getInfoFromToken('nom');
    this.profile.prenom = this.utilisateurService.getInfoFromToken('prenom');
    this.profile.email = this.utilisateurService.getInfoFromToken('email');
    this.profile.photo = this.utilisateurService.getInfoFromToken('photo');
    this.img=this.URL_IMAGE+"/"+ this.profile.photo;
    this.isLoading = false;
  }
}
