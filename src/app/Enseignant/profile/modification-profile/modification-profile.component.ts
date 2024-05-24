import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../../shared/Services/utilisateur.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { Utilisateur } from '../../../shared/models/utilisateur.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-modification-profile',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDividerModule, MatIconModule,
    RouterLink, RouterLinkActive,
    FormsModule, MatFormFieldModule, MatInputModule,
    MatProgressSpinnerModule],
  templateUrl: './modification-profile.component.html',
  styleUrl: './modification-profile.component.css'
})
export class ModificationProfileComponent implements OnInit {

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
