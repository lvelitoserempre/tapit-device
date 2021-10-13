import { Component, Input, Output, OnChanges, EventEmitter, Inject, ViewChild, ElementRef } from '@angular/core';
import { PromosService } from '../promos/promos.service';
import { CuponsService } from '../cupons/cupons.service';
import * as moment from 'moment';
import 'moment/locale/es';
import { DOCUMENT } from '@angular/common';
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
export class ModalComponent implements OnChanges {
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
  pointsText: string;
  cancellationText: string;
  couponCancellationSucces: string;
  cancellationConfirmText: string;
  urlToSend: String;
  titleTosend: String;
  showActivatePromo: boolean = false;
  showActiveCouppon: boolean = false;
  showActiveWarning: boolean = false;
  showActiveSuccess: boolean = false;
  showActiveRedeem: boolean = false;
  cameFromList: boolean = false;
  showProduct: boolean = false;
  confirmDeactivation: boolean = false;
  errorMessage: boolean = false;
  errorMessageText: boolean = false;
  isLoading: boolean = false;
  largeText: boolean = false;
  public checkCollection;
  public item$: any[];
  errorTitle = 'Error del sistema';
  isInfo:boolean = false;

  error = {
      '003': {
        "code": "403",
        "message": '¡Ups! Puedes puede volver a activar esta promoción el ',
        "title":"Redimiste recientemente esta promoción",
        'type': "info"
      },
      '002': {
        "code": "403",
        "message": 'Este cupón ya lo tienes disponible, para canjearlo ve a Mis Cupones',
        "title":"Este cupón ya está activo",
        'type': "info"
      },
      '004': {
        "code": "403",
        "message": '¡Ups! Este cupón ya ha sido asignado',
        "title":"Este cupón ya está activo",
        'type': "info"
      },
      '007': {
        "code": "403",
        "message": 'Actualiza tú número de celular para que puedas disfrutar de nuestras promos',
        "title":"Actualiza tu info",
        'type': "info"
      },
      '010': {
        "code": "403",
        "message": '¡Ups! Este cupón ya no esta disponible',
        "title":"Error del sistema",
        'type': "info"
      },
      '013': {
        "code": "403",
        "message": '¡Ups! Este cupón ya no existe',
        "title":"Error del sistema",
        'type': "info"
      },
      '024': {
        "code": "403",
        "message": '¡Ups! Ya llegaste al límite de cupones',
        "title":"Error del sistema",
        'type': "info"
      },
      '100': {
        "code": "400",
        "message": "El usuario no existe.",
        "title": "Error del sistema",
        "type": "error"
      },
      "101": {
        "code": "400",
        "message": "El cupón no ha sido asignado a este usuario.",
        "title": "Error del sistema",
        "type": "error"
      },
      "102": {
        "code": "400",
        "message": "Actualiza tú número de celular para que puedas disfrutar de nuestras promos.",
        "title": "Actualiza tu info",
        "type": "info"
      },
      "103": {
        "code": "400",
        "message": "El teléfono verificado debe existir.",
        "title": "Error del sistema",
        "type": "error"
      },
      "110": {
        "code": "400",
        "message": "La promoción del cupón no existe en Tapit.",
        "title": "Error del sistema",
        "type": "error"
      },
      "111": {
        "code": "400",
        "message": "Este cupón ya fue desactivado antes.",
        "title": "Error del sistema",
        "type": "error"
      },
      "120": {
        "code": "400",
        "message": "Ocurrió un error al consultar tus puntos.",
        "title": "Error del sistema",
        "type": "error"
      },
      "121": {
        "code": "400",
        "message": "¡Ups! No cuentas con los suficientes puntos para esta promo.",
        "title": "¡No te alcanzan los puntos!",
        "type": "error"
      },
      "130": {
        "code": "400",
        "message": "Ocurrió un error al intentar activar el cupón.",
        "title": "Error del sistema",
        "type": "error"
      },
      "131": {
        "code": "400",
        "message": "Ocurrió un error durante el proceso de activación.",
        "title": "Error del sistema",
        "type": "error"
      },
      "132": {
        "code": "400",
        "message": "Error de comunicación",
        "title": "Error del sistema",
        "type": "error"
      },
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private promosService: PromosService,
    private cuponService: CuponsService,
    private fireStore: AngularFirestore,
    private analyticsService: AnalyticsService) { }

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

      this.titleTosend = this.item[0].title;

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
      this.titleTosend = this.item[0].title;
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
    const selectedItem = this.item[0];
    const currentItem = this.currentItem[0];
    if (this.cardType === 'promo') {
      if (selectedItem.type === 'Product') {
        this.btnMessage = "Redime con puntos";
        this.pointsText = "Llévala por"
        this.cancellationText = "Cancelar cupón"
        this.cancellationConfirmText = 'Si cancelas el cupón, devolvemos <span class="text-primary-500">'+selectedItem.points+' puntos</span> a tu cuenta.'
        this.couponCancellationSucces = `Tus <span class="text-primary-500">${selectedItem.points} puntos</span> están de nuevo en tu cuenta`
        this.urlToSend = 'wallet/shop'
      } else if (selectedItem.type === 'Promotion') {
        this.btnMessage = "Activar Promo"
        this.pointsText = "Ganas"
        this.cancellationText = "Cancelar promo"
        this.cancellationConfirmText = 'Si cancelas la promo, no sumas puntos para tu próxima pola.'
        this.couponCancellationSucces = 'Sigue canjeando promociones ¡Cuándo quieras!'
        this.urlToSend = 'wallet/promos'
      }
    } else {
      if (currentItem.type === 'Product') {
        this.pointsText = 'Usaste';
        this.cancellationText = 'Cancelar cupón'
        this.cancellationConfirmText = 'Si cancelas el cupón, devolvemos <span class="text-primary-500">'+currentItem.points+' puntos</span> a tu cuenta.'
        this.couponCancellationSucces = `Tus <span class="text-primary-500">${currentItem.points} puntos</span> están de nuevo en tu cuenta`
      } else if (currentItem.type === 'Promotion') {
        this.pointsText = 'Ganas';
        this.cancellationText = 'Cancelar Promo'
        this.cancellationConfirmText = 'Si cancelas la promo, no sumas puntos para tu próxima pola.'
        this.couponCancellationSucces = 'Sigue canjeando promociones ¡Cuándo quieras!'
      }
    }

  }

  activatePromo() {
    this.isLoading = true
    this.showActivatePromo = false;

    this.promosService.activatePromo(this.item[0].promotion_id)
    .subscribe(response => {

      this.activePromoItem = response;
      this.qrcode = this.activePromoItem.code;
      this.couponId = this.activePromoItem.id_coupon;
      this.showActiveCouppon = true;
      this.isLoading = false;

      this.dataLayerConfirmation('confirm_and_pay_with_points')

      if(this.activePromoItem.type === 'Product'){
        this.pointsText = "Usaste"
        this.cancellationText = "Cancelar cupón"
      } else if (this.activePromoItem.type === 'Promotion'){
        this.pointsText = "Ganas"
        this.cancellationText = "Cancelar promo"
      }

    }, error => {
      this.errorMessage = true;
      this.isLoading = false;
      let errorMessage = this.error[error.error.message]?this.error[error.error.message].message:error.error.message;
      this.errorTitle = this.error[error.error.message].title;
      this.isInfo = this.error[error.error.message].type == 'info';
      if (error.error.message == '003') {
        errorMessage = this.error[error.error.message].message + moment(error.error.data.assignmentAvailable* 1000).format('DD/MM/YY HH:mm');
      }
      this.errorMessageText = errorMessage;
      console.error(error)
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
    }, error => {
      this.errorMessage = true;
      this.isLoading = false;
      let errorMessage = this.error[error.error.message]?this.error[error.error.message].message:error.error.message;
      this.errorTitle = this.error[error.error.message].title;
      this.isInfo = this.error[error.error.message].type == 'info';
      if (error.error.message == '003') {
        errorMessage = this.error[error.error.message].message + moment(error.error.data.assignmentAvailable* 1000).format('DD/MM/YY HH:mm');
      }
      this.errorMessageText = errorMessage;
      console.error(error)
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
    } else if(this.showActiveSuccess){
      this.launchReload();
      this.dataLayerQR('close', 'deactivateCouponSuccess');
    } else if(this.showActiveCouppon){
      this.dataLayerQR('close', 'qrCuponera');
    } else if(this.showActiveRedeem){
      this.dataLayerQR('close', 'couponSuccess');
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
    this.showActivatePromo ? this.dataLayerConfirmation('see_stores') : this.dataLayerQR('see_stores', 'qrCuponera');
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
      'product': this.item[0].title,
      'product_id': this.item[0].promotion_id || this.item[0].id,
      'promo': this.item[0].promotion || this.item[0].description,
      'points': this.item[0].points,
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
