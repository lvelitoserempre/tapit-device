import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() {
  }

  static scrollToElement(id: string) {
    const element = document.getElementById(id);
    setTimeout(() => {
      element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    }, 1000);
  }
}
