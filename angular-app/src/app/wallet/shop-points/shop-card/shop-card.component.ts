import { Component, Input, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { AnalyticsService } from '../../../services/anaylitics/analytics.service'

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.scss']
})
export class ShopCardComponent implements OnInit, AfterViewInit {
  @Input() product: string;
  @Input() presentation: string;
  @Input() neutral: boolean;
  @Input() red: boolean;
  @Input() yellow: boolean;

  @Input() products: any;
  @Input() title;
  @Input() imgUrl;
  @Input() promotion;
  @Input() id;
  @Input() points;
  @Input() color;

  public modal;
  myModal = false;
  currentItem: any;
  cardType: string;

  constructor(private elementRef: ElementRef, private analyticsService: AnalyticsService) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.modal = this.elementRef.nativeElement.querySelector('#modal--info');
  }

  openModal(btnType: string){
    this.myModal = true;
    this.cardType = btnType;
    if(btnType === 'promo'){
      this.currentItem = this.products.filter((item: any) =>{
        return item.promotion_id === this.id
      });
      this.dataLayerEvent();
    }
  }

  dataLayerEvent() {
    this.analyticsService.pushEvent({
      'event': 'cuponera',
      'section': 'redeem_in_stores',
      'product': this.currentItem[0].title, 
      'product_id': this.currentItem[0].promotion_id,
      'promo': this.currentItem[0].promotion, 
      'points': this.currentItem[0].points 
    })
  }

  closeModal(e){
    this.myModal = e;
  }

}
