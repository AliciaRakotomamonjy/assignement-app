import { Component, OnInit } from '@angular/core';
import { Assignment } from '../../../shared/models/assignment.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from '../../../shared/Services/assignment.service';
import { HttpErrorResponse } from '@angular/common/http';
import {  MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatTable, MatTableModule } from '@angular/material/table';
import { AssignmentElve } from '../../../shared/models/assignmenteleve.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-detail-assignment',
  standalone: true,
  imports: [MatProgressSpinnerModule,CommonModule,MatTableModule,MatButtonModule],
  templateUrl: './detail-assignment.component.html',
  styleUrl: './detail-assignment.component.css'
})
export class DetailAssignmentComponent implements OnInit {
 
  assignmentTransmis : Assignment | undefined;
  isLoading = false;
  erreurMessage = "";
  displayedColumns = ["description","eleve","rendu","details"]
  assignmentEleves : AssignmentElve[] = [];

  constructor(private route: ActivatedRoute,private router: Router,private assignmentService: AssignmentService){}

  ngOnInit(): void {
    this.isLoading = true;
    const id = this.route.snapshot.params['id'];
    this.assignmentService.GetAssignmentByIdWithDetail(id).subscribe((response) => {
      this.assignmentTransmis = response;
      this.assignmentEleves = this.assignmentTransmis?.assignmenteleves
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

  goToDetailAssignmentEleve(assignmenteleveId: string){
    this.router.navigateByUrl("/accueil_Enseignant/detailassignmenteleve/"+assignmenteleveId);
  }

}
