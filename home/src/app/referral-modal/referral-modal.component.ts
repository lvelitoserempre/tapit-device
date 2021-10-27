import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-referral-modal',
  templateUrl: './referral-modal.component.html',
  styleUrls: ['./referral-modal.component.scss']
})
export class ReferralModalComponent implements OnInit {

  @Output() close: EventEmitter<boolean> = new EventEmitter();
  public isWarning: boolean = false;
  public isSuccess: boolean = false;
  public haveError: boolean = false;

  constructor(private http: HttpClient, private cookies: CookieService,) { }

  ngOnInit(): void {
  }

  public onOmitir(): void {
    this.isWarning = true;
    this.isSuccess = false;
  }

  private getReferralCode(token: string, code: string): Observable<any>  {
    return this.http.post(`${environment.firebase.functions.url}${environment.referral}`, { referralCode: code}, { headers: { authorization: `Bearer ${ token }`}})
  }

  private changeStatusReferralCode(token: string, code: string): Observable<any>  {
    return this.http.put(`${environment.firebase.functions.url}${environment.referral}`, { referralCode: code}, { headers: { authorization: `Bearer ${ token }`}})
  }

  public onVerificar(): void {
    let codeString = <HTMLInputElement>document.querySelector('#codeInput');
    let vals = codeString.value;
    this.getReferralCode(this.cookies.get('frbtkn'),vals).subscribe({
      next: data => {
        this.isSuccess = true;
        this.isWarning = false;
        this.changeStatusReferralCode(this.cookies.get('frbtkn'),vals).subscribe(res => {
          const response = res;
        });
      },
      error: error => {
          this.haveError = true;
      }
    });
  }

  public retornar(): void {
    this.isWarning = false;
    this.isSuccess = false;
  }

  public closeModal(): void {
    let vals = '';
    this.changeStatusReferralCode(this.cookies.get('frbtkn'),vals).subscribe(res => {
      const response = res;
    });
    this.close.emit(false);
  }

}
