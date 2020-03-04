import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent {

  @Input() event: Event;
  @Output() subscribe = new EventEmitter<Event>();

  constructor() { }

}
