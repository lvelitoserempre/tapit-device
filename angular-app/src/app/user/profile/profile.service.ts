import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends Subject<boolean> {

  hide: Subject<boolean>

  constructor() {
    super();
    this.hide = new Subject<boolean>();
  }
}
