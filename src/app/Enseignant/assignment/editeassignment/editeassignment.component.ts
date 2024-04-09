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

@Component({
  selector: 'app-editeassignment',
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
    MatProgressSpinnerModule
  ],
  templateUrl: './editeassignment.component.html',
  styleUrl: './editeassignment.component.css'
})
export class EditeassignmentComponent implements OnInit {
  datelimite: Date | undefined;
  description = ""
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  spinner = false
  constructor(private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, private assignmentService: AssignmentService, private router: Router,
    private route: ActivatedRoute) { }
  ErreurMessage = ""
  SuccessMessage = "";
  assignment: Assignment | undefined;
  ngOnInit(): void {
    this.GetAssignment();
  }
  GetAssignment() {
    let id = this.route.snapshot.params['id'];
    this.assignmentService.GetAssignmentById(id).subscribe((response) => {
      this.assignment = response
      this.description = this.assignment.description;
      this.datelimite = this.assignment.dateLimite;
    })
  }
  Valider() {
    this.ErreurMessage = ""
    this.SuccessMessage = ""
    this.isLinear = true
    this.spinner = true
    this._snackBar.open("Votre devoir est encours de modification", "", {
      duration: 2 * 1000,
    });
    if(this.datelimite==undefined){return}
    this.assignment!.description = this.description ;
    this.assignment!.dateLimite = this.datelimite ;
    this.assignmentService.EditeAssignment(this.assignment).subscribe((response) => {
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
  goToListe() {
    this.router.navigateByUrl("/accueil_Enseignant/listeassignment")
  }
}
