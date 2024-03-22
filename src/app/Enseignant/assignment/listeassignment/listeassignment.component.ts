import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Assignment } from '../../../shared/models/assignment.model';
import { AssignmentService } from '../../../shared/Services/assignment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTable, MatTableModule } from '@angular/material/table';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { UtilisateurService } from '../../../shared/Services/utilisateur.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Matiere } from '../../../shared/models/matiere.model';
import { MatiereService } from '../../../shared/Services/matiere.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-listeassignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatTable, CommonModule,
    MatPaginatorModule, MatTableModule, MatProgressSpinnerModule,
    FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatDatepickerModule,
    MatIconModule, MatDividerModule, MatButtonModule,
    RouterLink,RouterLinkActive],
  templateUrl: './listeassignment.component.html',
  styleUrl: './listeassignment.component.css'
})
export class ListeassignmentComponent implements OnInit {
  assignments: Assignment[] = [];
  displayedColumns: string[] = ['description', 'matiere', 'professeur', 'datePublication', 'dateLimite', 'editer', 'supprimer'];
  id = this.utilisateurService.getInfoFromToken('id')
  matier_id = this.utilisateurService.getInfoFromToken('matiere_id');
  matiere_libelle = this.utilisateurService.getInfoFromToken('matiere_libelle');

  constructor(private assignmentService: AssignmentService, private utilisateurService: UtilisateurService, private matiereService: MatiereService) { }
  ErreurMessage = ''
  spinner = true
  page = 0;
  limit = 5;
  totalDocs!: number;
  totalPages!: number;
  matieres: Matiere[] = [];
  filtre = {
    matiere: 'all',
    dateDebut: undefined,
    dateFin: undefined
  };
  SuccessMessage = "";
  ngOnInit(): void {
    this.getAllAssignmentWithPagination();
    this.getAllMatiere();
  }
  getAllMatiere() {
    this.matiereService.GetAllMatiere().subscribe((response) => {
      this.matieres = response;
    })
  }
  getAllAssignmentWithPagination() {
    this.spinner = true
    this.assignmentService.GetAllAssignmentWithPagination(this.page + 1, this.limit, this.filtre).subscribe((response) => {
      this.assignments = response.docs;
      this.totalDocs = response.totalDocs;
      this.totalPages = response.totalPages;
      this.limit = response.limit;
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

  handlePageEvent(event: PageEvent) {
    console.log(event)
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.getAllAssignmentWithPagination();
  }

  filtre_() {
    this.page = 0
    this.getAllAssignmentWithPagination();
  }
  deleteAssignment(id:string){
    this.assignmentService.DeleteAssignmentById(id).subscribe((response) => {
      this.SuccessMessage = response.message
      this.spinner = false
      this.getAllAssignmentWithPagination()
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
}
