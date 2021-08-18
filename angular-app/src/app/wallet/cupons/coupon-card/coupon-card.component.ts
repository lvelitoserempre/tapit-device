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
  
  constructor() { }

  ngOnInit(): void { }

}
