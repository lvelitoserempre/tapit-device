import { Component } from '@angular/core';
import { CuponsService } from './cupons.service';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import * as moment from 'moment';
import 'moment/locale/es';

@Component({
  selector: 'app-cupons',
  templateUrl: './cupons.component.html',
  styleUrls: ['./cupons.component.scss']
})
export class CuponsComponent {
  public promoteds = [];
  public consumeds = [];
  public token;
  public checkUser;
  public tokenUser;
  promosSubscription: Subscription;
  totalPages: number;
  actualPage: number;
  couponsPage: number = 0;
   

  constructor(
    private couponService: CuponsService,
    private loadingService: LoadingService
  ) {
    this.loadingService.show();
    this.loadCoupons();
  }

  reloadItems() {
    this.loadingService.show();
    this.promoteds = [];
    this.consumeds = [];
    this.couponsPage = 0;
    this.loadCoupons();
  }
  
  loadCoupons() {
    this.couponService.getCoupons(this.couponsPage + 1).subscribe((res:any) => {
      let response = res.items;

      this.actualPage = this.couponsPage;
      this.totalPages = res.totalPages;
      this.couponsPage = this.couponsPage + 1;

      response.map(e => {
        if(e.status === 'Active') {

          let date = new Date(e.dateEnd * 1000);
          let deactivationDate = moment(date).format('DD/MMM/YY');

          let elToPush = {
            'qr': e.qrBase64,
            'qrcode': e.code,
            'id': e.id_coupon,
            'brand': e.tapitCouponDrupal || '',
            'date': deactivationDate
          }
          this.promoteds.push(elToPush);
        } else {
          // let d = new Date(0).setUTCSeconds(e.deactivatedAt);
          let d = new Date(e.deactivatedAt);
          let dateNow = new Date(d);
          let day = dateNow.getUTCDate();
          let month = dateNow.getUTCMonth() + 1;
          let year = dateNow.getUTCFullYear();
          let dateToShow = ('0'+day).slice(-2)+'/'+('0'+month).slice(-2)+'/'+year;
          let elToPush = {
            'brand': e.tapitCouponDrupal || '',
            'date': dateToShow,
            'status': e.status
          }
          this.consumeds.push(elToPush);
        }
      })
      this.loadingService.hide();
    }, err => {
      this.loadingService.hide();
      console.error(err);
    });
  }

  onScroll() {
    if (this.actualPage < this.totalPages) {
      this.loadCoupons();
    } else {
      return
    }
  }
}
