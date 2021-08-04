import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit, AfterViewInit {

  public modal;

  constructor(private elementRef:ElementRef) { }

  ngAfterViewInit(): void {
    this.modal = this.elementRef.nativeElement.querySelector('#modal--info');
  }

  closeModal(): void {
    this.modal.classList.remove('active');
  }

  openModal(): void {
    this.modal.classList.add('active');
  }

  ngOnInit(): void {
  }

}
