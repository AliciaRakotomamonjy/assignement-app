import { Component, Inject } from '@angular/core';
import { AssignmentElve } from '../../shared/models/assignmenteleve.model';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-assignment-eleve',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './dialog-assignment-eleve.component.html',
  styleUrl: './dialog-assignment-eleve.component.css'
})
export class DialogAssignmentEleveComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAssignmentEleveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectFile(event: any) {
    this.data.selectedFile = event.target.files[0];
    console.log(this.data.selectedFile)
  }
}
