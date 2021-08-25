import { Component, Input, OnInit, Output, OnChanges, EventEmitter, Inject } from '@angular/core';
import { PromosService } from '../promos/promos.service';
import { CuponsService } from '../cupons/cupons.service';
import * as moment from 'moment';
import 'moment/locale/es';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/auth';
import auth = firebase.auth;

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

  item;
  activePromoItem;
  qrcode;
  couponId;
  promoExpirationDate;
  btnMessage: string;
  showActivatePromo: boolean = false;
  showActiveCouppon: boolean = false;
  showActiveWarning: boolean = false;
  showActiveSuccess: boolean = false;
  cameFromList: boolean = false;
  showProduct: boolean = false;
  confirmDeactivation: boolean = false;
  errorMessage: boolean = false;
  isLoading: boolean = false;


  constructor(@Inject(DOCUMENT) private document: Document, private promosService: PromosService, private cuponService: CuponsService) {
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

      let date = new Date(this.item[0].expiration * 1000);
      this.promoExpirationDate = moment(date).format('DD/MMM/YY');

      if(this.item[0].type === 'Product'){
        this.btnMessage = "Confirma y paga con puntos"
      } else if (this.item[0].type === 'Promotion'){
        this.btnMessage = "Confirma y activa promo"
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
      this.showActiveCouppon = true;
      this.isLoading = false;

    }, err => {
      this.errorMessage = true;
      this.isLoading = false;
    });
  }

  deactivateCoupon(){
    this.isLoading = true;
    this.showActiveWarning = false;

    auth().currentUser.getIdToken().then(tkn => {
      console.log('this is the token: ',tkn);
      this.cuponService.deactivateCoupons(tkn,this.couponId).subscribe(res => {
        this.showActiveWarning = false;
        this.showActiveSuccess = true;
        this.isLoading = false;
      }, err => {
        this.errorMessage = true;
        this.isLoading = false;
      })
      return tkn
    });
  }

  returnToCoupon(){
    if(this.cameFromList) {
      this.closeModal();
    } else {
      this.showActiveCouppon = true;
      this.showActiveWarning = false;
    }
  }

  showWarning() {
    this.showActiveCouppon = false;
    this.showActiveWarning = true;
  }

  closeModal() {
    this.close.emit(false);
  }

}
