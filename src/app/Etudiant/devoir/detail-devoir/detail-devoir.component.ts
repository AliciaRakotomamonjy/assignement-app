import { Component } from '@angular/core';
import { AssignmentElve } from '../../../shared/models/assignmenteleve.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentEleveService } from '../../../shared/Services/assignment-eleve.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DialogAssignmentEleveComponent } from '../../dialog-assignment-eleve/dialog-assignment-eleve.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-detail-devoir',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule, MatButtonModule,MatTooltipModule],
  templateUrl: './detail-devoir.component.html',
  styleUrl: './detail-devoir.component.css'
})
export class DetailDevoirComponent {
  assignmentEleveTransmis : AssignmentElve | undefined;
  isLoading = false;
  erreurMessage = ""

  constructor(
    private route: ActivatedRoute, 
    private assignmentEleveService: AssignmentEleveService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private router: Router) {

  }
  ngOnInit(): void {
    this.isLoading = true;
    const id = this.route.snapshot.params['id'];
    this.assignmentEleveService.GetAssignmentEleveById(id).subscribe((response) => {
      this.assignmentEleveTransmis = response;
      console.log(this.assignmentEleveTransmis)
      this.isLoading = false;
    }, (error: HttpErrorResponse) => {
      if (error.error instanceof ErrorEvent) {
        this.erreurMessage = 'Une erreur s\'est produite : ' + error.error.message;
        this.isLoading = false;
        console.log(error.error.message)
      } else {
        this.erreurMessage = error.error.message;
        this.isLoading = false;
      }
    })
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogAssignmentEleveComponent, {
      data: this.assignmentEleveTransmis,
      height: '400px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result?.action === "validate"){
        this.isLoading = true;
        if (this.assignmentEleveTransmis) {
          this.assignmentEleveTransmis.note = result?.data?.note;
          this.assignmentEleveTransmis.remarque = result?.data?.remarque;
        }
        this.assignmentEleveService.EditeAssignment(this.assignmentEleveTransmis).subscribe((response) => {
          this.assignmentEleveTransmis = response?.result;
          this.isLoading = false;
          const config = new MatSnackBarConfig();
          config.panelClass = ['custom-snackbar']; 
          config.duration = 3000;
          this.snackbar.open('Note attribué avec succès','Fermer',config)
        }, (error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            this.erreurMessage = 'Une erreur s\'est produite : ' + error.error.message;
            this.isLoading = false;
            console.log(error.error.message)
          } else {
            this.erreurMessage = error.error.message;
            this.isLoading = false;
          }
          const config = new MatSnackBarConfig();
          config.panelClass = ['custom-snackbar']; 
          config.duration = 3000;
          this.snackbar.open(this.erreurMessage,'Fermer',config)
        })
      }
    });
  }

  goToListe(){
    this.router.navigateByUrl("/accueil_Etudiant/mesdevoirs")
  }
}
