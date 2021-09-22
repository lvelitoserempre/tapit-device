import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class DrupalService {

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }

  getPage(page:string): Observable<any[]> {
    const headers = this.getHeaders();
    return this.httpClient.get(`${environment.drupal?.url}${environment.drupal?.v1ApiPath}?alias=/${page}`, headers)
    .pipe(map(response => this.processResponse(response)));
  }

  getWebViewPage(page:string): Observable<any[]> {
    const headers = {
      headers: {
        'x-token': environment.drupal?.token
      }
    }
    return this.httpClient.get(`${environment.drupal?.url}${environment.drupal?.v2ApiPath}?alias=/${page}&userType=logged`, headers)
    .pipe(map(response => this.processResponse(response)));
  }

  getHeaders() {
    const drupalSession = this.getDrupalSession();
    return {
      headers: drupalSession ?
        {
          'x-token': environment.drupal?.token,
          'Authorization': `Bearer ${drupalSession}`
        }
      :
        {
          'x-token': environment.drupal?.token
        }
    }
  }

  getDrupalSession(): string {
    return this.cookieService.get('__session');
  }

  private processResponse(response: any): any[] {
    let data = JSON.stringify(response.sections, null, 4);
    let pathFind = `${environment.drupal?.url}/sites/g/files`;
    let newPath = `${environment.drupal?.url.replace(environment.drupal.url?.includes('https') ? 'https://' : 'http://' , '/cache/')}/sites/g/files`;
    const json = data.split(pathFind).reduce((acc, item, index) =>  acc + (index > 0 ? (newPath+item) : item), '')
    return JSON.parse(json);
  }

  checkDrupalCTA() {
    const path = this.cookieService.get('LOGIN_REDIRECTION');
    if (path && !path.includes('#')) {
      this.cookieService.remove('LOGIN_REDIRECTION');
      window.location.href = path.includes('http') ? path : ('/'+path);
    }
  }
}
