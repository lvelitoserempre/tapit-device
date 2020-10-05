import {Component, Inject} from '@angular/core';
import {DialogConfiguration} from 'src/app/dialog/dialog-configuration';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogConfig: DialogConfiguration) {
  }
}
