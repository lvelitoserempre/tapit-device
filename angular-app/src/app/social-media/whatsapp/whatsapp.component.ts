import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss']
})
export class WhatsappComponent implements OnInit {
  
  @Input() 
  message: string;
  @Input() 
  label: string;

  constructor() { }

  ngOnInit(): void {
  }

}
