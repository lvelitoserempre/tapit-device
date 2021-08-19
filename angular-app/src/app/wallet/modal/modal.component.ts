import { Component, Input, OnInit, Output, OnChanges, EventEmitter } from '@angular/core';
import { PromosService } from '../promos/promos.service';
import * as moment from 'moment';
import 'moment/locale/es';

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
  promoExpirationDate;
  btnMessage: string;
  showActivatePromo: boolean = false;
  showActiveCouppon: boolean = false;
  showProduct: boolean = false;
  confirmDeactivation: boolean = false;
  errorMessage: boolean = false;
  isLoading: boolean = false;


  constructor(private promosService: PromosService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.currentItem == undefined) {
      return

    } else if (this.cardType === 'promo') {
      this.item = this.currentItem;
      this.showActivatePromo = true;
      this.showActiveCouppon = false;
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
      this.errorMessage = false;

      this.qrcode = this.currentItem[0].qrcode;
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
    
  }

  closeModal() {
    this.close.emit(false);
  }

}
