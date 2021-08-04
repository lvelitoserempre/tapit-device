import { Component, OnInit, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-shop-points',
  templateUrl: './shop-points.component.html',
  styleUrls: ['./shop-points.component.scss']
})
export class ShopPointsComponent implements OnInit, AfterViewInit {
  @Output() modalOpener = new EventEmitter();

  public boxes;

  constructor(private elementRef:ElementRef) { }

  ngAfterViewInit(): void {
    this.boxes = this.elementRef.nativeElement.querySelectorAll('.list-product--item');
    for(let i = 0; i < this.boxes.length; i++) {
      this.boxes[i].addEventListener('click', this.modalOpen.bind(this));
    }
  }

  ngOnInit(): void {
  }

  modalOpen(): void {
    this.modalOpener.emit(null)
  }

}
