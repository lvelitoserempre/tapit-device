import { Component } from '@angular/core';

@Component({
    selector: 'app-event-placeholder',
    templateUrl: './event-placeholder.component.html',
    styleUrls: ['./event-placeholder.component.scss']
})
export class EventPlaceholderComponent {

    message = 'Lo sentimos por ahora no tenemos eventos disponibles, pronto te sorprenderemos.';
    image = 'assets/images/event_placeholder.png';

    constructor() { }

}
