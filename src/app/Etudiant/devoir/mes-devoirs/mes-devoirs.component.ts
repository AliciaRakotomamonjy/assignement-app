import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AssignmentElve } from '../../../shared/models/assignmenteleve.model';
import { AssignmentEleveService } from '../../../shared/Services/assignment-eleve.service';
import { Matiere } from '../../../shared/models/matiere.model';
import { MatiereService } from '../../../shared/Services/matiere.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-mes-devoirs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    MatIconModule, 
    MatDividerModule, 
    MatButtonModule,
    MatInputModule,
    RouterLink,
    RouterLinkActive,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
  ],
  templateUrl: './mes-devoirs.component.html',
  styleUrl: './mes-devoirs.component.css'
})
export class MesDevoirsComponent implements OnInit {
  assignmentEleves: AssignmentElve[] = [];
  displayedColumns: string[] = ['description', 'matiere', 'professeur', 'dateRendu', 'descriptionDevoir','fichier', 'modification'];
  ErreurMessage = ''
  spinner = true
  page = 0;
  limit = 5;
  totalDocs!: number;
  totalPages!: number;
  matieres: Matiere[] = [];
  filtre = {
    idMatiere: undefined,
    dateDebut: undefined,
    dateFin: undefined,
    description: undefined
  };
  SuccessMessage = "";
  titreDestination = "Détails d'un devoir d'un élève";

  constructor(
    private assignmentEleveService: AssignmentEleveService, 
    private matiereService: MatiereService
  ) { }
  
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
    this.assignmentEleveService.GetAllAssignmentEleveWithPagination(this.page + 1, this.limit, this.filtre).subscribe((response) => {
      this.assignmentEleves = response.docs;
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
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.getAllAssignmentWithPagination();
  }

  filtre_() {
    this.page = 0
    this.getAllAssignmentWithPagination();
  }
  
}
