import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.scss']
})
export class ShopCardComponent implements OnInit {
  @Input() product: string;
  @Input() imgUrl: string;
  @Input() presentation: string;
  @Input() points: string;
  @Input() neutral: boolean;
  @Input() red: boolean;
  @Input() yellow: boolean;

  constructor() { }

  ngOnInit(): void { }
}
