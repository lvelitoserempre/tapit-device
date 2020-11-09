import {Injectable} from '@angular/core';
import {MatSpinner} from '@angular/material/progress-spinner';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private matDialogRef: MatDialogRef<MatSpinner, any>;

  constructor(private dialog: MatDialog) {
  }

  show() {
    this.matDialogRef = this.dialog.open(MatSpinner, {disableClose: true, panelClass: 'app-loading'});
    this.matDialogRef.componentInstance.diameter = 80;
    return this.dialog;
  }

  hide() {
    if (this.matDialogRef) {
      this.matDialogRef.close();
    }
  }
}
