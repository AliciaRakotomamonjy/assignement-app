import { Component, OnInit } from '@angular/core';
import { Assignment } from '../../../shared/models/assignment.model';
import { AssignmentService } from '../../../shared/Services/assignment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTable, MatTableModule } from '@angular/material/table';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-listeassignment',
  standalone: true,
  imports: [MatTable, MatPaginatorModule, MatTableModule,MatProgressSpinnerModule],
  templateUrl: './listeassignment.component.html',
  styleUrl: './listeassignment.component.css'
})
export class ListeassignmentComponent implements OnInit {
  assignments: Assignment[] = [];
  displayedColumns: string[] = ['description','matiere','professeur','datePublication','dateLimite'];
  constructor(private assignmentService: AssignmentService) { }
  ErreurMessage = ''
  spinner = true

  page = 0;
  limit = 5;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;

  ngOnInit(): void {
    this.getAllAssignmentWithPagination();
  }
  getAllAssignmentWithPagination() {
    this.spinner=true
    this.assignmentService.GetAllAssignmentWithPagination(this.page + 1, this.limit).subscribe((response) => {
      this.assignments = response.docs;
      this.totalDocs = response.totalDocs;
      this.totalPages = response.totalPages;
      this.limit = response.limit;
      this.spinner=false
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
}
