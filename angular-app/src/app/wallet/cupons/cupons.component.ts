import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CuponsService } from './cupons.service';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import 'moment/locale/es';
import { CouponCardPromotedComponent } from './coupon-card-promoted/coupon-card-promoted.component';

@Component({
  selector: 'app-cupons',
  templateUrl: './cupons.component.html',
  styleUrls: ['./cupons.component.scss']
})
export class CuponsComponent implements OnInit, AfterViewInit {
  @ViewChildren(CouponCardPromotedComponent) cards: QueryList<CouponCardPromotedComponent>
  public promoteds = [];
  public consumeds = [];
  public token;
  public checkUser;
  public tokenUser;
  promosSubscription: Subscription;
  totalPages: number;
  actualPage: number;
  couponsPage: number = 0;
  idToCompare: string;
  noCoupons: boolean = false;
  noLocationPermission = false;
  public onlineOffline: boolean = window.navigator.onLine;
  center: google.maps.LatLngLiteral;

  constructor(
    private couponService: CuponsService,
    private loadingService: LoadingService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.loadingService.show();

    this.route.queryParams.subscribe(params => {
      if(params['id']){
        this.idToCompare = params.id;
      }
    });
    if(localStorage.getItem('userLat')) {
      this.loadCoupons();
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      localStorage.setItem('userLat', String(this.center.lat));
      localStorage.setItem('userLng', String(this.center.lng));
      this.loadCoupons();
      }, (error) => {
        this.noLocationPermission = true;
        this.loadingService.hide();
      });
    }
  }

  ngAfterViewInit(): void {
    this.cards.changes.subscribe(cards => {
      cards.forEach(element => {
        if(element.couponId == this.idToCompare) {
          element.openModal('couppon');
        }
      });
    });
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
        if (e.status === 'Active') {

          let date = new Date(e.dateEnd * 1000);
          let deactivationDate = moment(date).format('DD/MMM/YY');

          let elToPush = {
            'qr': e.qrBase64,
            'qrcode': e.code,
            'id': e.id_coupon,
            'brand': e.tapitCouponDrupal || '',
            'date': deactivationDate,
            'type': e.type
          }
          this.promoteds.push(elToPush);
        } else if(e.status === 'Redeemed') {
          let date = new Date(e.redeemedAt * 1000);
          let deactivationDate = moment(date).format('DD/MM/YY');

          let elToPush = {
            'brand': e.tapitCouponDrupal || '',
            'date': deactivationDate,
            'status': e.status,
            'type': e.type
          }
          this.consumeds.push(elToPush);
        } else if (e.status === 'Expired') {
          let date = new Date(e.expiration * 1000);
          let dateToShow = moment(date).format('DD/MM/YY');
          let elToPush = {
            'brand': e.tapitCouponDrupal || '',
            'date': dateToShow,
            'status': e.status,
            'type': e.type
          }
          this.consumeds.push(elToPush);
        } else {
          let date = new Date(e.deactivatedAt * 1000);
          let dateToShow = moment(date).format('DD/MM/YY');
          let elToPush = {
            'brand': e.tapitCouponDrupal || '',
            'date': dateToShow,
            'status': e.status,
            'type': e.type
          }
          this.consumeds.push(elToPush);
        }
      })

      if (this.consumeds.length === 0 && this.promoteds.length === 0) {
        this.noCoupons = true;
        this.loadingService.hide();
      } else {
        this.noCoupons = false;
      }

      this.loadingService.hide();
    }, err => {
      this.loadingService.hide();
      this.noCoupons = true;
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
