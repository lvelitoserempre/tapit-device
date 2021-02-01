import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TransferState, makeStateKey } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class BrowserstateInterceptor implements HttpInterceptor {

  constructor(
    private transferState: TransferState,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    const storedResponse: string = this.transferState.get(makeStateKey(request.url), null);

    if (storedResponse) {
      const response = new HttpResponse({ body: storedResponse, status: 200 });
      return of(response);
    }
    return next.handle(request);
  }
}
