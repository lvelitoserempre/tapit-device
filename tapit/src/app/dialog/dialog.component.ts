import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogService} from '../services/dialog/dialog.service';
import {DialogConfigurationModel} from '../models/dialog-configuration.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
/**
 * Component for generic dialog
 */
export class DialogComponent {
  showLinkCopied = false;
  shareURL = 'cervezapoker.com/poker-roja/pkr000000';

  constructor(
    private dialogService: DialogService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogConfigurationModel
  ) {
  }

  selectAndCopy($event) {
    const button = $event.target;
    let tempInput = document.createElement('textarea');
    // @ts-ignore
    tempInput.style = 'position: absolute; left: -1000px; top: -1000px';
    tempInput.value = button.textContent;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    tempInput.setSelectionRange(0, 0);
    this.showLinkCopied = true;
    setTimeout(() => {
      this.showLinkCopied = false;
    }, 2000);
    document.body.removeChild(tempInput);
  }

  goToMap($event) {
    setTimeout(() => {
      document.querySelector('#map').scrollIntoView({
        behavior: 'smooth'
      });
    }, 500);

  }


}
