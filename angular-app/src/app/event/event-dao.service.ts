import {Injectable} from '@angular/core';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventDAO {

  constructor() {
  }

  getEvents() {
    return of([
      {
        name: 'Nombre del evento 1',
        image: 'https://jklabz.io/abdullah/am-events/wp-content/uploads/2018/05/banner-1.jpg',
        requiredBeers: 6
      },
      {
        name: 'Nombre del evento 2',
        image: 'https://www.elespectador.com/sites/default/files/theatre_of_voices._2018_0.jpg',
        requiredBeers: 3
      },
      {
        name: 'Nombre del evento 3',
        image: 'https://jklabz.io/abdullah/am-events/wp-content/uploads/2018/05/banner-1.jpg',
        requiredBeers: 9
      },
      {
        name: 'Nombre del evento 4',
        image: 'https://jklabz.io/abdullah/am-events/wp-content/uploads/2018/05/banner-1.jpg',
        requiredBeers: 8
      }
    ]);
  }
}