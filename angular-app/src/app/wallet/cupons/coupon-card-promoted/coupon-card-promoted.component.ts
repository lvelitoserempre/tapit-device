import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';

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
  public title: string;
  public imgUrl: string;
  public description: string;
  public points: string;
  public colorBg: string;
  public couponId: string;

  public modal;
  myModal = false;
  currentItem: any;
  cardType: string;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
      this.title = this.brandData.brand.name;
      this.description = this.brandData.title;
      this.points = this.brandData.points;
      this.imgUrl = this.brandData.image;
      this.couponId = this.id;
      this.colorBg = 'bg-'+this.brandData.brand.color + '-500 pb-5 pl-2 pr-2 pt-5 rounded-md';
      this.currentItem = [{ 'description': this.description, 'id': this.couponId, 'title': this.title, 'points': this.points, 'qr': this.qr, 'qrcode': this.qrcode }];
  }

  ngAfterViewInit(): void {
    this.modal = this.elementRef.nativeElement.querySelector('#modal--info');
  }


  openModal(btnType: string) {
    this.myModal = true;
    this.cardType = btnType;
  }

  closeModal(e) {
    this.myModal = e;
  }

}
