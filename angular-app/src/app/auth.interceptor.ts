import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token:string = '';
    if (request.url.indexOf(environment.drupal.url) != -1) {
      token = this.cookieService.get('DRUPAL_SESSION');
    } else {
      token = this.cookieService.get('frbtkn');
    }
    
    let supremeRequest = request;

    if (token) {
      supremeRequest = request.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }

    return next.handle(supremeRequest).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          this.router.navigateByUrl('/');
        }

        return throwError( err );

      })
    );
  }
}
