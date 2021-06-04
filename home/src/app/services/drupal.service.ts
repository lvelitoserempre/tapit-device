import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DrupalService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getHomeData(): Observable<any[]> {
    // return of(json)
    const headers = {
      headers: {
        'x-token': environment.drupal?.token
      }
    }
    return this.httpClient.get(`${environment.drupal?.url}/${environment.drupal?.oldApiPath}`, headers)
    .pipe(map(response => this.processResponse(response)));
  }

  getPage(page:string): Observable<any[]> {
    // return of(json)
    const headers = {
      headers: {
        'x-token': environment.drupal?.token
      }
    }
    return this.httpClient.get(`${environment.drupal?.url}/${environment.drupal?.newApiPath}?alias=/${page}`, headers)
    .pipe(map(response => this.processResponse2(response)));
  }

  private replaceUrl(imageUrl:any): string {
    if (!imageUrl.startsWith('/cache')) {
      return imageUrl ? ('/cache/' + imageUrl.replace(/https?:\/\//gi, '')) : imageUrl;
    } else {
      return imageUrl;
    }
  }

  private processResponse2(response: any): any[] {
    let data = JSON.stringify(response.sections, null, 4),
    pathFind = `${environment.drupal?.url}/sites/g/files`,
    newPath = `${environment.drupal?.url.replace('http://', '/cache/')}/sites/g/files`;
    return JSON.parse(data.replaceAll(pathFind, newPath));
  }

  private processResponse(response: any): any[] {
    let sections = [];
    if (response && response[0]) {
      sections = response[0].content;

      if (sections) {
        for (const section of sections) {
          if (section.type === 'welcome_message' && section.data) {
            const data = section.data;

            if (data) {
              section.messageAuthenticated = data.messageAuthenticated.value;
              section.messageAnonymous = data.messageAnonymous.value;
            }
          }

          if (section.type === 'seasonal_section') {
            const slides = section.data.seasonalCampaigns;

            if (slides) {
              for (const slide of slides) {
                if (slide.data.imageMobile) {
                  slide.data.imageMobile.image_url = this.replaceUrl(slide.data.imageMobile.image_url);
                }

                if (slide.data.imageDesktop) {
                  slide.data.imageDesktop.image_url = this.replaceUrl(slide.data.imageDesktop.image_url);
                }
                slide.button = {
                  link: slide.data.cta? slide.data.cta.uri: '',
                  label: slide.data.cta? slide.data.cta.title: '',
                  target : slide.data.cta? slide.data.cta.target: ''
                };
              }
            }

            section.slides = slides;
          }

          if (section.type === 'catalog') {
            section.title = section.data.title.value;
            section.description = section.data.description.value;
            const slides = section.data.products;

            if (slides) {
              for (const slide of slides) {
                slide.image = this.replaceUrl(slide.data.imageDesktop.image_url);
                slide.link = slide.data.buyLink?.uri;
              }
            }

            section.slides = slides;
          }

          if (section.type === 'recommended_section') {

            section.title = section.data.title?section.data.title.value:'';
            const slides = section.data.recommendedContent;

            if (slides) {
              for (const slide of slides) {
                if (slide.data.imageMobile) {
                  slide.data.imageMobile.image_url = this.replaceUrl(slide.data.imageMobile.image_url);
                }

                if (slide.data.imageDesktop) {
                  slide.data.imageDesktop.image_url = this.replaceUrl(slide.data.imageDesktop.image_url);
                }

                slide.title = slide.data.title?.value;
                slide.description = slide.data.description? slide.data.description.value: '';
                slide.cta = slide.data.cta;
              }
            }

            section.slides = slides;
          }
        }
      }
    }

    return sections;
  }

  private isMobile(): boolean {
    return window.innerWidth < 768;
  }
}
