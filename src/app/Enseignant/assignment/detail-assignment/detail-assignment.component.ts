import { Component, OnInit } from '@angular/core';
import { Assignment } from '../../../shared/models/assignment.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from '../../../shared/Services/assignment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { AssignmentElve } from '../../../shared/models/assignmenteleve.model';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { forkJoin } from 'rxjs';
import { CdkDragDrop, CdkDrag, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DialogNoteComponent } from '../../dialog-note/dialog-note.component';
import { AssignmentEleveService } from '../../../shared/Services/assignment-eleve.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-detail-assignment',
  standalone: true,
  imports: [MatListModule, MatDividerModule, MatProgressSpinnerModule, CommonModule, MatTableModule, MatButtonModule, MatButtonToggleModule, MatChipsModule, CdkDropListGroup, CdkDropList, CdkDrag, MatIconModule, MatTooltipModule],
  templateUrl: './detail-assignment.component.html',
  styleUrl: './detail-assignment.component.css'
})
export class DetailAssignmentComponent implements OnInit {

  assignmentTransmis: Assignment | undefined;
  isLoading = false;
  erreurMessage = "";
  displayedColumns = ["description", "eleve", "rendu", "fichier", "details"]
  assignmentEleves: AssignmentElve[] = [];
  modeAffichage = "table";
  assignmentEleveRendus: AssignmentElve[] = [];
  assignmentEleveNonRendus: AssignmentElve[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assignmentService: AssignmentService,
    private assignmentEleveService: AssignmentEleveService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAssignmentEleves();
  }

  getAssignmentEleves() {
    this.isLoading = true;
    const id = this.route.snapshot.params['id'];
    const assignementTable = this.assignmentService.GetAssignmentByIdWithDetail(id);
    const assignementDrapAndDrop = this.assignmentService.GetAssignementByIdWithDetailFiltered(id);
    forkJoin([assignementTable, assignementDrapAndDrop]).subscribe((response) => {
      console.log(response)
      this.assignmentTransmis = response[0];
      this.assignmentEleves = this.assignmentTransmis?.assignmenteleves

      this.assignmentEleveNonRendus = response[1]?.rendu_false
      this.assignmentEleveRendus = response[1]?.rendu_true
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

  goToDetailAssignmentEleve(assignmenteleveId: string) {
    this.router.navigateByUrl("/accueil_Enseignant/detailassignmenteleve/" + assignmenteleveId);
  }

  goToListe() {
    this.router.navigateByUrl("/accueil_Enseignant/listeassignment")
  }

  onChipSelect(event: MatChipListboxChange) {
    this.modeAffichage = event.value;
    this.getAssignmentEleves();
  }

  drop(event: CdkDragDrop<AssignmentElve[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.openDialog(event.item.data)
    }
  }

  openDialog(assignmentEleve: AssignmentElve) {
    const dialogRef = this.dialog.open(DialogNoteComponent, {
      data: { note: "", remarque: "" },
      height: '400px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.action === 'validate') {
        this.isLoading = true;
        if (assignmentEleve) {
          assignmentEleve.note = result?.data?.note;
          assignmentEleve.remarque = result?.data?.remarque;
        }
        this.assignmentEleveService.EditeAssignment(assignmentEleve).subscribe((response) => {
          assignmentEleve = response?.result;
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

  telecharger(assignmentEleve: AssignmentElve) {
    this.isLoading = true;
    this.assignmentEleveService.TelechargerFichierEleve(assignmentEleve).subscribe(response => {
      const blob = new Blob([response], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = assignmentEleve?.fichier;
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
