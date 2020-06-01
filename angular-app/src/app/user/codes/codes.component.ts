import { Component, OnInit, OnDestroy } from '@angular/core';
import { CodeDAO } from './code-dao.service';
import Code from './codes';
import { Subscription } from 'rxjs';
import {LoaderService} from 'src/app/loader/loader-service/loader.service';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.scss']
})
export class MyCodesComponent implements OnInit, OnDestroy {
  codesSubscription: Subscription;
  codes: Code[];

  constructor(private codeDAO: CodeDAO, private loaderService: LoaderService,) { }
  ngOnDestroy(): void {
    this.codesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loaderService.show();
    this.codesSubscription = this.codeDAO.getAll().subscribe((codes: Code[]) => {
      this.loaderService.hide();
      this.codes = codes;
    })
  }

}
