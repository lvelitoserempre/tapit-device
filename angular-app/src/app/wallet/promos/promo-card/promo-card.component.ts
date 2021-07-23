import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promo-card',
  templateUrl: './promo-card.component.html',
  styleUrls: ['./promo-card.component.scss']
})
export class PromoCardComponent implements OnInit {
  @Input() title: string;
  @Input() imgUrl: string;
  @Input() promotion: string;

  constructor() { }

  ngOnInit(): void {
  }

}
