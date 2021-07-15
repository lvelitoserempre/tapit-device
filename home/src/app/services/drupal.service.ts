import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import { CookieService } from 'ngx-cookie';
import 'firebase/firestore';
import 'firebase/auth';
import { CookiesService } from './cookies.service';

@Injectable({
  providedIn: 'root'
})
export class DrupalService {

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }

  getPage(page:string): Observable<any[]> {
    const headers = this.getHeaders()
    return this.httpClient.get(`${environment.drupal?.url}/${environment.drupal?.newApiPath}?alias=/${page}`, headers)
    .pipe(map(response => this.processResponse2(response)));
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
    return this.cookieService.get('DRUPAL_SESSION')
  }

  private processResponse2(response: any): any[] {
    let data = JSON.stringify(response.sections, null, 4),
    pathFind = `${environment.drupal?.url}/sites/g/files`,
    newPath = `${environment.drupal?.url.replace(environment.drupal.url?.includes('https') ? 'https://' : 'http://' , '/cache/')}/sites/g/files`;
    const json = data.split(pathFind).reduce((acc, item, index) =>  acc + (index > 0 ? (newPath+item) : item), '')
    return JSON.parse(json);
  }

  onLoginCompleate() {
    window.ssoApp?.onFlowCompleted().subscribe((res: any) => {
      if(res.status === "done") {
        const path = CookiesService.getValue('LOGIN_REDIRECTION');
        if(path && !path.includes('#'))  {
          CookiesService.setValue('LOGIN_REDIRECTION', null);
          window.location.href = path.includes('http') ? path : ('/'+path);
        }
      }
    });
  }
}
