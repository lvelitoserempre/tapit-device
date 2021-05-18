import { Injectable, EventEmitter } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends Subject<boolean> {

  hide: Subject<boolean>

  public showNavbar: string = null;
  public showNabvar$ = new EventEmitter;

  constructor() {
    super();
    this.hide = new Subject<boolean>();
    this.observerToggleNavbar();
  }

  observerToggleNavbar() {
    this.showNabvar$.subscribe(toggle => {
      this.showNavbar = toggle;
    });
  }

  changeShowNavbar(evt: any) {
    this.showNabvar$.emit(evt);
  }
}
