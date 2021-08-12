import { Component, OnInit, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-shop-points',
  templateUrl: './shop-points.component.html',
  styleUrls: ['./shop-points.component.scss']
})
export class ShopPointsComponent implements OnInit, AfterViewInit {
  @Output() modalOpener = new EventEmitter();

  public boxes;
  public mocks: Array<any>;

  constructor(private elementRef:ElementRef) { 
    this.mocks = [
      {
        neutral: false,
        yellow: true,
        red: false,
        presentation: "1 Botella de 300 ml",
        product: "Cerveza BBC Bacatá Blanca",
        points: "200",
        imgUrl: "../../assets/images/cerveza-item-2.png"
      },
      {
        neutral: true,
        yellow: false,
        red: false,
        presentation: "1 Botella de 300 ml",
        product: "Cerveza BBC Bacatá Blanca",
        points: "200",
        imgUrl: "../../assets/images/cerveza-item-2.png"
      },
      {
        neutral: false,
        yellow: false,
        red: true,
        presentation: "1 Botella de 300 ml",
        product: "Cerveza BBC Bacatá Blanca",
        points: "200",
        imgUrl: "../../assets/images/cerveza-item-2.png"
      }
    ]
  }

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
