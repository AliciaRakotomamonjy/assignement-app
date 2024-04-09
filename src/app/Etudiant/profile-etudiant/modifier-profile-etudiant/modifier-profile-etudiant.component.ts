import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Utilisateur } from '../../../shared/models/utilisateur.model';
import { UtilisateurService } from '../../../shared/Services/utilisateur.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-modifier-profile-etudiant',
  standalone: true,
  imports: [MatCard, MatCardContent, MatButtonModule, MatDividerModule, MatIconModule,
    RouterLink, RouterLinkActive,
    FormsModule, MatFormFieldModule, MatInputModule,
    MatProgressSpinnerModule],
  templateUrl: './modifier-profile-etudiant.component.html',
  styleUrl: './modifier-profile-etudiant.component.css'
})
export class ModifierProfileEtudiantComponent implements OnInit {

  profile= new Utilisateur();
  URL_IMAGE=environment.API_URL+environment.IMAGE_API;
  img=""
  isLoading = true;
  nom = "";
  prenom = "";
  email = "";
  ErreurMessage = ""
  SuccessMessage = "";
  spinner=false
  constructor(private utilisateurService: UtilisateurService,private _snackBar: MatSnackBar,private router: Router) {

  }

  ngOnInit(): void {
    this.nom = this.utilisateurService.getInfoFromToken('nom');
    this.prenom = this.utilisateurService.getInfoFromToken('prenom');
    this.email = this.utilisateurService.getInfoFromToken('email');
    this.profile.photo = this.utilisateurService.getInfoFromToken('photo');
    this.profile.role = this.utilisateurService.getInfoFromToken('role');
    this.img=this.URL_IMAGE+"/"+ this.profile.photo;
    this.isLoading = false;
  }
  Valider() {
    this.ErreurMessage = ""
    this.SuccessMessage = ""
    this.spinner = true
    this._snackBar.open("Modification encours...", "", {
      duration: 2 * 1000,
    });
    const formData = new FormData();
    formData.append('nom', this.nom);
    formData.append('prenom', this.prenom);
    formData.append('photo', this.profile.photo);

    this.utilisateurService.ModifierUtilisateur(formData).subscribe((response) => {
      this.SuccessMessage = response.message
      this.utilisateurService.setToken(response.token)
      this.goToProfil()
      this.spinner = false
    }, (error: HttpErrorResponse) => {
      if (error.error instanceof ErrorEvent) {
        this.ErreurMessage = 'Une erreur s\'est produite : ' + error.error.message;
        this.spinner = false;
        console.log(error.error.message)
      } else {
        this.ErreurMessage = error.error.message;
        this.spinner = false;
      }
    })
  }
  selectFile(event: any) {
    this.profile.photo = event.target.files[0];
  }
  goToProfil() {
    this.router.navigateByUrl("/accueil_Etudiant/profile")
  }
}
