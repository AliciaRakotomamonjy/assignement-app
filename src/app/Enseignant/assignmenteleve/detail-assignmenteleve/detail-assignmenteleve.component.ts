import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentElve } from '../../../shared/models/assignmenteleve.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogNoteComponent } from '../../dialog-note/dialog-note.component';
import { AssignmentEleveService } from '../../../shared/Services/assignment-eleve.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detail-assignmenteleve',
  standalone: true,
  imports: [MatProgressSpinner, CommonModule, MatButtonModule, MatListModule, MatIconModule],
  templateUrl: './detail-assignmenteleve.component.html',
  styleUrl: './detail-assignmenteleve.component.css'
})
export class DetailAssignmenteleveComponent implements OnInit {

  assignmentEleveTransmis: AssignmentElve | undefined;
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

  openDialog() {
    const dialogRef = this.dialog.open(DialogNoteComponent, {
      data: { note: this.assignmentEleveTransmis?.note, remarque: this.assignmentEleveTransmis?.remarque },
      height: '400px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.action === "validate") {
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
          this.snackbar.open('Note attribué avec succès', 'Fermer', config)
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
          this.snackbar.open(this.erreurMessage, 'Fermer', config)
        })
      }
    });
  }

  goToListe() {
    this.router.navigateByUrl("/accueil_Enseignant/detailassignment/" + this.assignmentEleveTransmis?.assignment?._id)
  }

  telecharger() {
    this.isLoading = true;
    if(this.assignmentEleveTransmis) {
      this.assignmentEleveService.TelechargerFichierEleve(this.assignmentEleveTransmis).subscribe(response => {
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.assignmentEleveTransmis?.fichier || 'devoir_eleve';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        this.isLoading = false;
      },
        error => {
          console.error('Une erreur s\'est produite lors du téléchargement du fichier :', error);
          const config = new MatSnackBarConfig();
          config.panelClass = ['custom-snackbar'];
          config.duration = 3000;
          this.snackbar.open(error?.error?.message || "Une erreur s'est produite !", 'Fermer', config)
          // Traitez l'erreur ici, par exemple affichez un message d'erreur à l'utilisateur
          this.isLoading = false;
        });
    }
  }


}
