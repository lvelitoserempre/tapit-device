import { Component, Input, OnInit, Output, OnChanges, EventEmitter, Inject, ViewChild, ElementRef } from '@angular/core';
import { PromosService } from '../promos/promos.service';
import { CuponsService } from '../cupons/cupons.service';
import * as moment from 'moment';
import 'moment/locale/es';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/auth';
import auth = firebase.auth;
import { AngularFirestore } from '@angular/fire/firestore';
import { AnalyticsService } from '../../services/anaylitics/analytics.service'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() visible: boolean;
  @Input() currentItem: any;
  @Input() cardType: string;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Output("reloadItemsParent") reloadItemsParent: EventEmitter<any> = new EventEmitter();
  @ViewChild('closeIcon') closeIcon: ElementRef;

  item;
  activePromoItem;
  qrcode;
  couponId;
  promoExpirationDate;
  btnMessage: string;
  urlToSend: String;
  showActivatePromo: boolean = false;
  showActiveCouppon: boolean = false;
  showActiveWarning: boolean = false;
  showActiveSuccess: boolean = false;
  showActiveRedeem: boolean = false;
  cameFromList: boolean = false;
  showProduct: boolean = false;
  confirmDeactivation: boolean = false;
  errorMessage: boolean = false;
  isLoading: boolean = false;
  largeText: boolean = false;
  public checkCollection;
  public item$: any[];


  constructor(@Inject(DOCUMENT) private document: Document, private promosService: PromosService, private cuponService: CuponsService, private fireStore: AngularFirestore, private analyticsService: AnalyticsService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges() {

    this.visible ? this.document.body.classList.add('modal-open') : this.document.body.classList.remove('modal-open');

    if (this.currentItem == undefined) {
      return

    } else if (this.cardType === 'promo') {
      this.item = this.currentItem;
      this.showActivatePromo = true;
      this.showActiveCouppon = false;
      this.showActiveWarning = false;
      this.showActiveSuccess = false;
      this.cameFromList = false;
      this.errorMessage = false;
      this.checkCollection = setInterval(this.listenFirebase, 1000);

      let date = new Date(this.item[0].expiration * 1000);
      this.promoExpirationDate = moment(date).format('DD/MMM/YY');

      if(this.item[0].type === 'Product'){
        this.btnMessage = "Confirma y paga con puntos"
        this.urlToSend = 'wallet/shop'
      } else if (this.item[0].type === 'Promotion'){
        this.btnMessage = "Confirma y activa promo"
        this.urlToSend = 'wallet/promos'
      }

      if(this.item[0].title.length > 7 || this.item[0].promotion.length > 7){
        this.largeText = true;
      } else {
        this.largeText = false;
      }

    } else if (this.cardType === 'couppon') {
      this.item = this.currentItem;
      this.showActivatePromo = false;
      this.showActiveCouppon = true;
      this.showActiveWarning = false;
      this.showActiveSuccess = false;
      this.cameFromList = false;
      this.errorMessage = false;

      this.qrcode = this.currentItem[0].qrcode;
      this.couponId = this.currentItem[0].id;
      this.activePromoItem = {'qrBase64': this.currentItem[0].qr, 'code': this.qrcode};
      this.checkCollection = setInterval(this.listenFirebase, 1000);

    } else if (this.cardType === 'deactivate') {
      this.item = this.currentItem;
      this.showActivatePromo = false;
      this.showActiveCouppon = false;
      this.showActiveWarning = true;
      this.showActiveSuccess = false;
      this.errorMessage = false;
      this.cameFromList = true;

      this.qrcode = this.currentItem[0].qrcode;
      this.couponId = this.currentItem[0].id;
      this.activePromoItem = {'qrBase64': this.currentItem[0].qr, 'code': this.qrcode};
    }
  }

  activatePromo() {

    this.isLoading = true
    this.showActivatePromo = false;

    this.promosService.activatePromo(this.item[0].promotion_id).subscribe(res => {
      let response = res;

      this.activePromoItem = response;
      this.qrcode = this.activePromoItem.code;
      this.couponId = this.activePromoItem.id_coupon;
      this.showActiveCouppon = true;
      this.isLoading = false;

      this.dataLayerConfirmation('confirm_and_pay_with_points')

    }, err => {
      this.errorMessage = true;
      this.isLoading = false;
      console.error(err)
    });
  }

  launchReload() {
    this.reloadItemsParent.emit();
  }

  deactivateCoupon(){
    this.isLoading = true;
    this.showActiveWarning = false;

    this.cuponService.deactivateCoupons(this.couponId)
    .subscribe(() => {
      this.showActiveWarning = false;
      this.showActiveSuccess = true;
      this.isLoading = false;

      this.dataLayerQR('cancel_coupon', 'deactivateCoupon');
    }, err => {
      this.errorMessage = true;
      this.isLoading = false;
      console.error(err);
    })
      
  }

  listenFirebase = () => {
      const collection = this.fireStore.collection('user_account_tap').doc(auth().currentUser.uid).collection('promotion_coupons').stateChanges(['modified']);
      collection.subscribe((coupon) => {
        this.item$ = [];
        coupon.forEach((couponData: any) => {
          this.item$.push({id: couponData.payload.doc.id, data: couponData.payload.doc.data()});
        });
        if(this.item$.length) {
          if(this.qrcode == this.item$[0].data.code && this.item$[0].data.status == 'Redeemed') {
            this.showActiveRedeem = true;
            this.showActivatePromo = false;
            this.showActiveCouppon = false;
            this.showActiveSuccess = false;
            this.showActiveWarning = false;
          } else {
            return
          }
        }
      });
      clearInterval(this.checkCollection);
  }

  returnToCoupon(){
    if(this.cameFromList) {
      this.closeModal();
    } else {
      this.showActiveCouppon = true;
      this.showActiveWarning = false;
      this.dataLayerQR('dont_cancel', 'deactivateCoupon')
    }
  }

  showWarning() {
    
    this.dataLayerQR('deactivate_coupons', 'qrCuponera');

    this.showActiveCouppon = false;
    this.showActiveWarning = true;
  }

  closeModal() {
    
    if(this.showActivatePromo) {
      this.dataLayerConfirmation('close');
    } else if(this.showActiveCouppon){
      this.dataLayerQR('close', 'deactivateCoupon');
    } else if(this.errorMessage){
      this.dataLayerError('close');
    }

    if(this.showActiveRedeem) {
      this.launchReload();
    }
    this.close.emit(false);
    this.showActiveRedeem = false;
    clearInterval(this.checkCollection);
  }

  seeStoresEvent(){
    this.showActivatePromo ? this.dataLayerConfirmation('see_stores') : this.dataLayerQR('see_stores', 'qr_cuponera');
  }

  couponSuccessBtn(){
    this.dataLayerQR('see_coupons', 'couponSuccess')
  }

  dataLayerConfirmation(action: string) {

    this.analyticsService.pushEvent({
      'event': 'confirmationCuponera',
      'coupon_type': this.item[0].type === 'Product' ? 'redeem_in_stores' : 'day_promotions',
      'product': this.item[0].title, 
      'product_id': this.item[0].promotion_id, 
      'promo': this.item[0].promotion, 
      'points': this.item[0].points, 
      'action': action 
    })
  }

  dataLayerQR(action: string, event: string){
    this.analyticsService.pushEvent({
      'event': event,
      'coupon_type': this.activePromoItem.type === 'Product' ? 'redeem_in_stores' : 'day_promotions',
      'product': this.activePromoItem.title, 
      'product_id': this.activePromoItem.promotion_id,
      'promo': this.activePromoItem.promotion, 
      'points': this.activePromoItem.points, 
      'action': action,
      'code_id': this.activePromoItem.code
    })
  }

  dataLayerError(action){
    this.analyticsService.pushEvent({
      'event': 'error',
      'error_type': 'redeem_in_stores',
      'section': 'my_coupons',
      'action': action
    })
  }

}
