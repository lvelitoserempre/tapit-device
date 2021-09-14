import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataRepoService {
  private showWallet = new Subject<boolean>();
  private showDiscover = new Subject<boolean>();
  private showMicrogifting = new Subject<boolean>();

  constructor() { }

  getShowWallet():any {
    return this.showWallet.asObservable();
  }
  
  setShowWallet(data: boolean) {
    this.showWallet.next(data);
  }

  getShowDiscover():any {
    return this.showDiscover.asObservable();
  }
  
  setShowDiscover(data: boolean) {
    this.showDiscover.next(data);
  }
  
  getShowMicrogifting():any {
    return this.showMicrogifting.asObservable();
  }
  
  setShowMicrogifting(data: boolean) {
    this.showMicrogifting.next(data);
  }
}
