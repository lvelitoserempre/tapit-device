import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnalyticsService } from '../../../services/anaylitics/analytics.service'

@Component({
  selector: 'app-coupon-card-promoted',
  templateUrl: './coupon-card-promoted.component.html',
  styleUrls: ['./coupon-card-promoted.component.scss']
})
export class CouponCardPromotedComponent implements OnInit, AfterViewInit {
  @Input() brandData: any;
  @Input() qr: string;
  @Input() id: string;
  @Input() qrcode: string;
  @Input() date: string;
  @Input() type: string;
  @Output("reloadItems") reloadItems: EventEmitter<any> = new EventEmitter();
  public title: string;
  public imgUrl: string;
  public description: string;
  public points: string;
  public colorBg: string;
  public couponId: string;
  public product: boolean = false;

  public modal;
  myModal = false;
  currentItem: any;
  cardType: string;
  pointsText: string;

  constructor(private elementRef: ElementRef, private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
      this.title = this.brandData.brand.name;
      this.description = this.brandData.detail_description;
      this.points = this.brandData.points;
      this.imgUrl = this.brandData.image;
      this.couponId = this.id;
      this.colorBg = 'bg-'+this.brandData.brand.color + '-500 pb-5 pl-2 pr-2 pt-5 rounded-md';
      this.currentItem = [{ 'description': this.description, 'id': this.couponId, 'title': this.title, 'points': this.points, 'qr': this.qr, 'qrcode': this.qrcode,'date': this.date, 'type': this.type }];

      if(this.currentItem[0].type === 'Product'){
        this.pointsText = 'Usaste'
        this.product = true;
      } else {
        this.pointsText = 'Ganas'
      }
  }

  ngAfterViewInit(): void {
    this.modal = this.elementRef.nativeElement.querySelector('#modal--info');
  }

  openModal(btnType: string) {
    this.myModal = true;
    this.cardType = btnType;

    this.analyticsService.pushEvent({
      'event': 'myCoupons',
      'coupon_type': 'redeem_in_stores',
      'product': this.currentItem[0].title,
      'product_id': this.currentItem[0].id, 
      'promo': this.currentItem[0].description, 
      'points': this.currentItem[0].points,
      'action': btnType === 'coupon' ? 'show_code' : 'deactivate_coupon',
      'code_id': this.currentItem[0].qrcode
    })
  }

  reloadItemsParent() {
    this.reloadItems.emit();
  }

  closeModal(e) {
    this.myModal = e;
  }

}
