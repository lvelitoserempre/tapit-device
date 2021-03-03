import {Component, OnDestroy, OnInit} from '@angular/core';
import {CodeDAO} from './code-dao.service';
import Code from './codes';
import {Subscription} from 'rxjs';
import {DialogService} from 'src/app/dialog/dialog-service/dialog.service';
import {MatDialog} from '@angular/material/dialog';
import {CodeDetailDialogComponent} from './code-detail-dialog/code-detail-dialog.component';
import {LoadingService} from '../../loading.service';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.scss'],
})
export class MyCodesComponent implements OnInit, OnDestroy {
  codesSubscription: Subscription;
  codes: Code[];

  constructor(
    private codeDAO: CodeDAO,
    private loadingService: LoadingService,
    private dialogService: DialogService,
    private dialog: MatDialog
  ) {
  }

  ngOnDestroy(): void {
    this.codesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.codesSubscription = this.codeDAO
      .getAll()
      .subscribe((codes: Code[]) => {
        this.loadingService.hide();
        this.codes = codes;
      });
  }

  showQRDetail(code): void {
    this.dialog.open(CodeDetailDialogComponent, {
      panelClass: ['dialog', 'dialog-full'],
      data: code,
    });
  }
}
