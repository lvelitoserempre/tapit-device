import { Input } from '@angular/core';
import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

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
  currentItem: [];
  cardType: string;

  constructor(private elementRef: ElementRef) { }

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
    }
  }

  closeModal(e) {
    this.myModal = e;
  }



}
