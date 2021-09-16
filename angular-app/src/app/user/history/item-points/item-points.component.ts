import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-item-points',
  templateUrl: './item-points.component.html',
  styleUrls: ['./item-points.component.scss']
})
export class ItemPointsComponent implements OnInit {

  @Input('item') item;

  constructor() { }

  ngOnInit(): void { }

}
