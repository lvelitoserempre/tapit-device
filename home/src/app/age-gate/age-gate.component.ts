import { Component, TemplateRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BirthDate } from './BirthDate';
import { CookieService } from "ngx-cookie-universal";

@Component({
  selector: 'app-age-gate',
  templateUrl: './age-gate.component.html',
  styleUrls: ['./age-gate.component.scss']
})
export class AgeGateComponent {
  closeResult: string;
  @ViewChild('ageGate', { read: TemplateRef }) private ageGate:TemplateRef<any>;
  birthdate: BirthDate = {};
  isAdult: any = null;

  @Output('showVerifyIdentity') showVerifyIdentity: any = new EventEmitter<boolean>();

  constructor(
    private modalService: NgbModal,
    private cookies: CookieService
  ) { }

  public openAgeGate() {
    this.openModal(this.ageGate);
  }

  private openModal(content: any) {
    const modalConfig = {
      ariaLabelledBy: 'modal-basic-title',
      ignoreBackdropClick: true,
      keyboard: false
    }
    this.modalService.open(content, modalConfig).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  checkAge():void {
    let day = this.birthdate.day;
    let month = this.birthdate.month;
    let year = this.birthdate.year;
    let currentYear = new Date();
    let born = new Date(year, month - 1, day);
    let age = this.get_age(born, currentYear);
    let dateToLocal = born.getTime();
    if (this.isValidDate(year, month - 1, day)) {
      if (age < 18) {
        this.isAdult = false;
      } else if (age > 120) {
        this.isAdult = 'invalid';
      } else {
        this.isAdult = true;
        this.cookies.put('anonymousUserBirthDate', dateToLocal.toString(), {
          domain: 'tapit.com.co'
        });
        this.modalService.dismissAll();
        this.showVerifyIdentity.emit(true);
      }
    } else {
      this.isAdult = 'invalid';
    }
  }

  private get_age(born: any, now: any) {
    var birthday = new Date(now.getFullYear(), born.getMonth(), born.getDate());
    if (now >= birthday) {
      return now.getFullYear() - born.getFullYear();
    } else {
      return now.getFullYear() - born.getFullYear() - 1;
    }
  }

  private isValidDate(year: any, month: any, day: any) {
    var d = new Date(year, month, day);
    if (d.getFullYear() == year && d.getMonth() == month && d.getDate() == day) {
      return true;
    }
    return false;
  }

}
