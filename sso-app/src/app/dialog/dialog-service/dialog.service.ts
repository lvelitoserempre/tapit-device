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

  showErrorMessage(message: string, translationParams?): Observable<MatDialogRef<DialogComponent>> {
    const observable = translationParams ? this.translateService.get(message, translationParams) : of(message);

    return observable.pipe(map(message => {
      return this.dialog.open(DialogComponent, {
        panelClass: ['border', 'border-primary-500'],
        data: {
          title: 'DIALOG.ERROR_MESSAGE.TITLE',
          message,
          buttonOne: 'DIALOG.ERROR_MESSAGE.BUTTON_LABEL'
        }
      });
    }));
  }
}
