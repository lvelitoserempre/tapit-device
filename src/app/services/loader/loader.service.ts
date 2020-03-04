import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for loader spinner
 */
export class LoaderService {

  isLoading = new Subject<boolean>();

  /**
   * Show loading spinner
   */
  show() {
    this.isLoading.next(true);
  }

  /**
   * Hide loading spinner
   */
  hide() {
    this.isLoading.next(false);
  }
}
