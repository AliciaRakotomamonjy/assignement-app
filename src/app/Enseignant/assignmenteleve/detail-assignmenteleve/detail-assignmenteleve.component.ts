import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentElve } from '../../../shared/models/assignmenteleve.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogNoteComponent } from '../../dialog-note/dialog-note.component';
import { AssignmentEleveService } from '../../../shared/Services/assignment-eleve.service';

@Component({
  selector: 'app-detail-assignmenteleve',
  standalone: true,
  imports: [MatProgressSpinner, CommonModule, MatButtonModule],
  templateUrl: './detail-assignmenteleve.component.html',
  styleUrl: './detail-assignmenteleve.component.css'
})
export class DetailAssignmenteleveComponent implements OnInit {

  assignmentEleveTransmis : AssignmentElve | undefined;
  isLoading = false;
  erreurMessage = ""

  constructor(private route: ActivatedRoute, private assignmentEleveService: AssignmentEleveService,private dialog: MatDialog) {

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
    const dialogRef = this.dialog.open(DialogNoteComponent, {
      data: {note: this.assignmentEleveTransmis?.note, remarque: this.assignmentEleveTransmis?.remarque},
      height: '400px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      this.isLoading = true;
      if (this.assignmentEleveTransmis) {
        this.assignmentEleveTransmis.note = result?.note;
        this.assignmentEleveTransmis.remarque = result?.remarque;
      }
      this.assignmentEleveService.EditeAssignment(this.assignmentEleveTransmis).subscribe((response) => {
        this.assignmentEleveTransmis = response?.result;
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
    });
  }




}
