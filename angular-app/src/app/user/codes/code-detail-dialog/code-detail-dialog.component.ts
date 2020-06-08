import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Code from '../codes';

@Component({
  selector: 'app-code-detail-dialog',
  templateUrl: './code-detail-dialog.component.html',
  styleUrls: ['./code-detail-dialog.component.scss']
})
export class CodeDetailDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public code: Code) { }

  ngOnInit(): void {
  }

}
