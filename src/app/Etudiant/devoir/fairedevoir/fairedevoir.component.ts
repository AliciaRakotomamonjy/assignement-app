import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AssignmentService } from '../../../shared/Services/assignment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../../../shared/models/assignment.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-fairedevoir',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './fairedevoir.component.html',
  styleUrl: './fairedevoir.component.css'
})
export class FairedevoirComponent implements OnInit {
  description = ""
  NomFichier = undefined;
  fichier?: File;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  spinner = false
  spinner2 = true
  constructor(private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, private assignmentService: AssignmentService, private router: Router,
    private route: ActivatedRoute) { }
  ErreurMessage = ""
  SuccessMessage = "";
  assignment: Assignment | undefined;
  assignmentId = "";
  Formulaire=true;
  ngOnInit(): void {
    this.GetAssignment();
  }
  GetAssignment() {
    this.assignmentId = this.route.snapshot.params['id'];
    this.assignmentService.GetAssignmentById(this.assignmentId).subscribe((response) => {
      this.assignment = response;
      this.spinner2=false;
      const dateLimite = new Date(this.assignment.dateLimite);
      const comparaison = dateLimite.getTime() - new Date().getTime();
      if (comparaison < 0) {
        this.ErreurMessage = "Vous ne pouvez pas faire cette assignment car la date limite est dépassée.";
        this.isLinear = true;
        this.Formulaire=false;
      }
    })
  }
  Valider() {
    this.ErreurMessage = ""
    this.SuccessMessage = ""
    this.isLinear = true
    this.spinner = true
    this._snackBar.open("Votre devoir est encours d'envoie", "", {
      duration: 2 * 1000,
    });
    if (this.fichier == undefined) {
      this.ErreurMessage = "Veuillez remplir les champs svp"
      this.spinner = false;
      this.isLinear = false;
      return;
    }
    const formData = new FormData();
    console.log(this.fichier)
    formData.append('description', this.description);
    formData.append('fichier', this.fichier);
    formData.append('assignmentId', this.assignmentId);

    this.assignmentService.FaireAssignment(formData).subscribe((response) => {
      this.SuccessMessage = response.message
      this.spinner = false
      this.isLinear = false
    }, (error: HttpErrorResponse) => {
      if (error.error instanceof ErrorEvent) {
        this.ErreurMessage = 'Une erreur s\'est produite : ' + error.error.message;
        this.spinner = false;
        this.isLinear = false
        console.log(error.error.message)
      } else {
        this.ErreurMessage = error.error.message;
        this.spinner = false;
        this.isLinear = false
      }
    })
  }
  selectFile(event: any) {
    this.fichier = event.target.files[0];
  }
  goToListe(){
    this.router.navigateByUrl("/accueil_Etudiant/les_devoirs")
  }
}
