import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { Utilisateur } from '../../shared/models/utilisateur.model';
import { UtilisateurService } from '../../shared/Services/utilisateur.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink,MatListModule,MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profile: Utilisateur | undefined;
  matiere=""
  isLoading = true;
  img = "";

  constructor(private utilisateurService: UtilisateurService){

  }

  ngOnInit(): void {
    this.profile = new Utilisateur();
    this.profile.nom = this.utilisateurService.getInfoFromToken('nom');
    this.profile.prenom = this.utilisateurService.getInfoFromToken('prenom');
    this.profile.email = this.utilisateurService.getInfoFromToken('email');
    this.profile.motdepasse = this.utilisateurService.getInfoFromToken('motdepasse');
    this.profile.photo = this.utilisateurService.getInfoFromToken('photo');
    this.profile.role = this.utilisateurService.getInfoFromToken('role');
    this.matiere=this.utilisateurService.getInfoFromToken('matiere_libelle');
    this.isLoading = false;
    this.img=environment.API_URL+environment.IMAGE_API+'/'+this.utilisateurService.getInfoFromToken('photo');
  }
}
