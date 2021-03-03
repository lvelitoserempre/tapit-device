import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Code from '../codes';
import {LoadingService} from '../../../loading.service';

@Component({
  selector: 'app-code-detail-dialog',
  templateUrl: './code-detail-dialog.component.html',
  styleUrls: ['./code-detail-dialog.component.scss']
})
export class CodeDetailDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public code: Code,
    private loadingService: LoadingService,
  ) { }

  scrollModal() {
    this.loadingService.show();
    setTimeout(() => {
      document.getElementById('scroll-view').scrollTo(0, 0);
      this.loadingService.hide();
    }, 500);
  }

  ngOnInit(): void {
    this.scrollModal();
  }

}
