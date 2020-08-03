import { Component, OnInit, OnDestroy } from "@angular/core";
import { CodeDAO } from "./code-dao.service";
import Code from "./codes";
import { Subscription } from "rxjs";
import { LoaderService } from "src/app/loader/loader-service/loader.service";
import { DialogService } from "src/app/dialog/dialog-service/dialog.service";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { CodeDetailDialogComponent } from "./code-detail-dialog/code-detail-dialog.component";

@Component({
  selector: "app-codes",
  templateUrl: "./codes.component.html",
  styleUrls: ["./codes.component.scss"],
})
export class MyCodesComponent implements OnInit, OnDestroy {
  codesSubscription: Subscription;
  codes: Code[];

  constructor(
    private codeDAO: CodeDAO,
    private loaderService: LoaderService,
    private dialogService: DialogService,
    private dialog: MatDialog
  ) {}
  ngOnDestroy(): void {
    this.codesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loaderService.show();
    this.codesSubscription = this.codeDAO
      .getAll()
      .subscribe((codes: Code[]) => {
        this.loaderService.hide();
        this.codes = codes;
      });
  }

  showQRDetail(code): void {
    this.dialog.open(CodeDetailDialogComponent, {
      panelClass: ["dialog", "dialog-full"],
      data: code,
    });
  }
}
