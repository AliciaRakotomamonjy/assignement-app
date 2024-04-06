import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Utilisateur } from '../../shared/models/utilisateur.model';
import { UtilisateurService } from '../../shared/Services/utilisateur.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCard,MatCardContent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  
  profile: Utilisateur | undefined;
  isLoading = true;

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
    this.isLoading = false;
  }
}
