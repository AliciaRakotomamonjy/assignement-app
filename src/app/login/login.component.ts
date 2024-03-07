import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { UtilisateurService } from '../shared/Services/utilisateur.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatCardModule
    , MatProgressSpinnerModule, MatGridListModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = "prof@prof.prof";
  motdepasse = "ABC123abc.";
  hide = true;
  spinner = false;
  ErreurMessage = "";
  constructor(private utilisateurService: UtilisateurService, private router: Router) {

  }

  loginPost() {
    this.spinner = true
    this.ErreurMessage = "";
    if (this.motdepasse == "" || this.email == "") {
      this.ErreurMessage = "Veuillez remplir les champs svp";
      this.spinner = false;
    }
    else {
      const form = {
        email: this.email,
        motdepasse: this.motdepasse
      }
      this.utilisateurService.Login(form).subscribe((reponse: any) => {
        this.utilisateurService.setToken(reponse.token)
        let UtilisateurRole = this.utilisateurService.getInfoFromToken('role');
        if (UtilisateurRole == "prof") {
          this.router.navigateByUrl("accueil_Enseignant");
        }
        else {
          this.router.navigateByUrl("accueil_Etudiant");
        }
      }, (error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          this.ErreurMessage = 'Une erreur s\'est produite : ' + error.error.message;
          this.spinner = false;
        } else {
          this.ErreurMessage = error.error.message;
          this.spinner = false;
        }
      })
    }
  }
}
