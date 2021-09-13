import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-item-points',
  templateUrl: './item-points.component.html',
  styleUrls: ['./item-points.component.scss']
})
export class ItemPointsComponent implements OnInit {

  @Input('item') item;
  positiveTransaction: boolean = true;
  cuponeraItem: boolean = false;

  constructor() { }

  ngOnInit(): void {

    this.isCuponeraItem();
    this.cuponeraTransactionType();
  }

  cuponeraTransactionType() {
    this.item.quantity < 0 ? this.positiveTransaction = false : this.positiveTransaction = true;
  }

  isCuponeraItem() {
    this.item.originType === "tapIt_cuponera_Product" ? this.cuponeraItem = true : this.cuponeraItem = false;
  }

}
