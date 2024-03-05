import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { UtilisateurService } from '../../shared/Services/utilisateur.service';
import { HttpErrorResponse } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatCardModule
    , MatProgressSpinnerModule, MatGridListModule,MatSelectModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  nom="";
  prenom="";
  email = "";
  role="";
  libelle="";
  motdepasse = "";
  confirmationmotdepasse = "";
  hide = true;
  hide2 = true;
  spinner = false;
  ErreurMessage = "";
  SuccessMessage = "";
  roles: any[] = [
    {value: 'prof', viewValue: 'Professeur'},
    {value: 'eleve', viewValue: 'Elève'},
  ];
  constructor(private utilisateurService: UtilisateurService) {

  }
  inscriptionPost() {
    this.spinner = true
    this.ErreurMessage="";
    this.SuccessMessage="";
    if (this.motdepasse =="" || this.email== "" || this.nom=="" || this.prenom=="" || this.confirmationmotdepasse=="" || this.role=="" ) {
      this.ErreurMessage = "Veuillez remplir les champs svp";
      this.spinner=false;
    }
    else if(this.role=="prof" && this.libelle==""){
      this.ErreurMessage = "Veuillez remplir le champs matière";
      this.spinner=false;
    }
    else{
      const form ={
        nom:this.nom,
        prenom:this.prenom,
        motdepasse:this.motdepasse,
        validationmdp:this.confirmationmotdepasse,
        role:this.role,
        email:this.email,
        libelle:this.libelle
      }
      this.utilisateurService.Inscription(form).subscribe((reponse: any) => {
        this.utilisateurService.setToken(reponse.token)
        console.log(reponse.message);
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
