import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderService } from "src/app/loader/loader-service/loader.service";
import Code from '../codes';

@Component({
  selector: 'app-code-detail-dialog',
  templateUrl: './code-detail-dialog.component.html',
  styleUrls: ['./code-detail-dialog.component.scss']
})
export class CodeDetailDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public code: Code,
    private loaderService: LoaderService,
  ) { }

  scrollModal() {
    this.loaderService.show();
    setTimeout(() => {
      document.getElementById('scroll-view').scrollTo(0, 0);
      this.loaderService.hide();
    }, 500);
  }

  ngOnInit(): void {
    this.scrollModal();
  }

}
