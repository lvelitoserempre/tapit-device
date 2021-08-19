import { Component, Input, OnInit, AfterViewInit, ElementRef } from '@angular/core';

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

  constructor(private elementRef: ElementRef) { }

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
    }
    console.log(this.currentItem)
  }

  closeModal(e){
    this.myModal = e;
  }

}
