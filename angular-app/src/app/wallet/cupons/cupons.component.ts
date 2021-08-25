import { AfterViewInit, Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { CuponsService } from './cupons.service';
import { Subscription } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/auth';
import auth = firebase.auth;
import { LoadingService } from 'src/app/services/loading.service';
import * as moment from 'moment';
import 'moment/locale/es';

@Component({
  selector: 'app-cupons',
  templateUrl: './cupons.component.html',
  styleUrls: ['./cupons.component.scss']
})
export class CuponsComponent implements AfterViewInit{
  private collection = environment.firebase.collections.userAccount;
  public promoteds = [];
  public consumeds = [];
  public token;
  public checkUser;
  promosSubscription: Subscription;
  totalPages: number;
  actualPage: number;
  couponsPage: number = 0;

  constructor(private http: HttpClient, private couponService: CuponsService, private loadingService: LoadingService) { }
  

  ngOnInit(): void {
    this.loadingService.show();
  }

  ngAfterViewInit(): void {
    this.checkUser = setInterval(this.loadToken, 1000);
  }

  loadToken = () => {
    if(auth().currentUser) {
      auth().currentUser.getIdToken().then(tkn => {
        this.loadCoupons(tkn);
        return tkn
      });
      clearInterval( this.checkUser );
    }
  }

  loadCoupons(token) {
    this.couponService.getCoupons(token, this.couponsPage + 1).subscribe((res:any) => {
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
      console.log(err);
    });
  }

  onScroll(){
    if(this.actualPage < this.totalPages){
      this.loadToken();
    } else {
      return
    }
  }


}
