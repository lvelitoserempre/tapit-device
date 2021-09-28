import { Input } from '@angular/core';
import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { AnalyticsService } from '../../../services/anaylitics/analytics.service'

@Component({
  selector: 'app-promo-card',
  templateUrl: './promo-card.component.html',
  styleUrls: ['./promo-card.component.scss']
})
export class PromoCardComponent implements OnInit, AfterViewInit {
  @Input() title: string;
  @Input() imgUrl: string;
  @Input() promotion: string;
  @Input() id: string;
  @Input() promos: any;

  public modal;
  myModal = false;
  currentItem: any;
  cardType: string;

  constructor(private elementRef: ElementRef, private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.modal = this.elementRef.nativeElement.querySelector('#modal--info');
  }

  openModal(btnType: string) {
    this.myModal = true;
    this.cardType = btnType;
    if (btnType === 'promo') {
      this.currentItem = this.promos.filter((item: any) => {
        return item.promotion_id === this.id
      })
      this.dataLayerEvent();
    }
  }

  dataLayerEvent() {
    this.analyticsService.pushEvent({
      'event': 'cuponera',
      'section': 'day_promotions',
      'product': this.currentItem[0].title, 
      'product_id': this.currentItem[0].promotion_id, 
      'promo': this.currentItem[0].promotion, 
      'points': this.currentItem[0].points 
    })
  }

  closeModal(e) {
    this.myModal = e;
  }



}
