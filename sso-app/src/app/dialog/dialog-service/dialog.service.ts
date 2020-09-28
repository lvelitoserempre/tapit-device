import {Injectable} from '@angular/core';
import {DialogComponent} from 'src/app/dialog/dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {IframeMessagingService} from '../../shared/services/iframe-messaging.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog, private translateService: TranslateService, private iframeMessagingService:IframeMessagingService) {
  }

  showErrorMessage(translationObjectKey: string, translationParams?, redirectUrl?: string): Observable<MatDialogRef<DialogComponent>> {
    if (translationParams) {
      return this.translateService.get(translationObjectKey + '.MESSAGE', translationParams)
        .pipe(map(messageText => {
          return this.showMessage('error', translationObjectKey + '.TITLE', messageText, translationObjectKey + '.OK_BUTTON', redirectUrl);
        }));
    }

    return of(this.showMessage('error', translationObjectKey + '.TITLE', translationObjectKey + '.MESSAGE', translationObjectKey + '.OK_BUTTON', redirectUrl));
  }

  showMessage(type: string, title: string, message: string, buttonOne: string, redirectUrl?:string): MatDialogRef<DialogComponent> {
    const dialog = this.dialog.open(DialogComponent, {
      panelClass: ['app-dialog'],
      data: {
        type: type,
        title: title,
        message: message,
        buttonOne: buttonOne
      }
    });

    if(redirectUrl != null){
      dialog.afterClosed().subscribe(() => {
        this.iframeMessagingService.sendDataToParent('redirect', redirectUrl);
      });
      window.parent.location.replace(redirectUrl);
    }

    return dialog;
  }
}
