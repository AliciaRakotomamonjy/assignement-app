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

@Component({
  selector: 'app-detail-assignment',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule, MatTableModule, MatButtonModule, MatButtonToggleModule, MatChipsModule,CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './detail-assignment.component.html',
  styleUrl: './detail-assignment.component.css'
})
export class DetailAssignmentComponent implements OnInit {

  assignmentTransmis: Assignment | undefined;
  isLoading = false;
  erreurMessage = "";
  displayedColumns = ["description", "eleve", "rendu", "details"]
  assignmentEleves: AssignmentElve[] = [];
  modeAffichage = "table";
  assignmentEleveRendus: AssignmentElve[] = [];
  assignmentEleveNonRendus: AssignmentElve[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private assignmentService: AssignmentService) { }

  ngOnInit(): void {
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
    }
  }

}
