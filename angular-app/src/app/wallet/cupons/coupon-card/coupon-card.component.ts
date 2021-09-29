import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-coupon-card',
  templateUrl: './coupon-card.component.html',
  styleUrls: ['./coupon-card.component.scss']
})
export class CouponCardComponent implements OnInit {
  @Input() title: string;
  @Input() imgUrl: string;
  @Input() date: string;
  @Input() description: string;
  @Input() points: string;
  @Input() status: string;
  @Input() type: string;
  public currentStatus: string;
  pointsText: string;
  redeemedPromo: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
    this.checkStatus();
   }

  checkStatus() {
    if (this.status === 'Deactivated') {
      this.currentStatus = "Desactivado"
    } else if (this.status === 'Expired') {
      this.currentStatus = "Expirado"
    } else {
      this.currentStatus = "Canjeado"
      if(this.type === 'Product'){
        this.pointsText = 'Usaste'
      } else {
        this.redeemedPromo = true;
        this.pointsText = 'Ganaste'
      }
    }
  }

}
