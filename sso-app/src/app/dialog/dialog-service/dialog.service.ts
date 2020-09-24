import {Injectable} from '@angular/core';
import {DialogComponent} from 'src/app/dialog/dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog, private translateService: TranslateService) {
  }

  showErrorMessage(translationObjectKey: string, translationParams?): Observable<MatDialogRef<DialogComponent>> {
    if (translationParams) {
      return this.translateService.get(translationObjectKey + '.MESSAGE', translationParams)
        .pipe(map(messageText => {
          return this.showMessage('error', translationObjectKey + '.TITLE', messageText, translationObjectKey + '.BUTTON_LABEL');
        }));
    }

    return of(this.showMessage('error', translationObjectKey + '.TITLE', translationObjectKey + '.MESSAGE', translationObjectKey + '.BUTTON_LABEL'));
  }

  showMessage(type: string, title: string, message: string, buttonOne: string): MatDialogRef<DialogComponent> {
    return this.dialog.open(DialogComponent, {
      panelClass: ['app-dialog'],
      data: {
        type: type,
        title: title,
        message: message,
        buttonOne: buttonOne
      }
    });
  }
}
