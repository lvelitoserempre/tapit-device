import { Component, OnInit, OnDestroy } from '@angular/core';
import { CodeDAO } from './code-dao.service';
import Code from './codes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.scss']
})
export class MyCodesComponent implements OnInit, OnDestroy {
  codesSubscription: Subscription;
  codes: Code[]

  constructor(private codeDAO: CodeDAO) { }
  ngOnDestroy(): void {
    this.codesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.codesSubscription = this.codeDAO.getAll().subscribe((codes: Code[]) => {
      this.codes = codes;
    })
  }

}
