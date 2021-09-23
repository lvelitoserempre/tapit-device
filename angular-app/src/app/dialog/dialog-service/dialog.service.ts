import { Injectable } from '@angular/core';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  showErrorMessage(message: string): Observable<MatDialogRef<DialogComponent>> {
    return of(this.showMessage('error', 'ERROR', message, 'ACEPTAR'));
  }

  showMessageError(title: string, message: string, buttonOne: string, redirectUrl?: string): Observable<MatDialogRef<DialogComponent>> {
    return of(this.showMessage('error', title, message, buttonOne, redirectUrl));
  }

  showMessage(type: string, title: string, message: string, buttonOne: string, redirectUrl?: string): MatDialogRef<DialogComponent> {
    const dialog = this.dialog.open(DialogComponent, {
      panelClass: ['app-dialog'],
      data: {
        type: type,
        title: title,
        message: message,
        buttonOne: buttonOne
      }
    });

    if (redirectUrl != null) {
      dialog.afterClosed().subscribe(() => {
        window.location.replace(redirectUrl);
        window.parent.location.replace(redirectUrl);
      });
    }

    return dialog;
  }
}
