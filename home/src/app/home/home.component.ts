import {Component, Inject, OnInit} from '@angular/core';
import {UserAccount} from '../user/user-account';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {DrupalService} from '../drupal.service';
import {formatNumber} from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer  } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: UserAccount;
  points: number;
  sections: any[];
  seasonalConfig = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  catalogConfig = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    variableWidth: false,
    height: '280px'
  };
  welcomeSection: any = {};

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private drupalService: DrupalService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    
  }

  ngOnInit(): void {
    console.log(isPlatformBrowser(this.platformId));
    console.log(isPlatformServer (this.platformId));
    this.angularFireAuth.user
    .pipe(switchMap(user => {
      return user ? this.angularFirestore.collection('user_account_tap').doc(user.uid).valueChanges() : of(null);
    }))
    .subscribe(user => {
      this.user = user;

      this.drupalService.getHomeData()
      .pipe(map(sections => this.fillPlaceholders(sections)))
      .subscribe(sections => {
        this.sections = sections;

        for (const section of sections) {
          if (section.type === 'welcome_message') {
            this.welcomeSection = section;
          }

          if (section.type === 'seasonal_section') {
            //this.seasonalConfig.variableWidth = section.slides.length > 1 && window.screen.width < 768;
            for (const slide of section.slides) {
              slide.data.imageMobile.image_url= slide.data.imageMobile.image_url.replace('styles/large/public/', '');
              slide.data.imageDesktop.image_url = slide.data.imageDesktop.image_url.replace('styles/large/public/', '');
            }
          }
        }
      });
    });
  }

  private fillPlaceholders(sections: any[]): any[] {
    for (const section of sections) {
      if (section && section.type === 'welcome_message') {
        section.messageAuthenticated = this.fillUserData(section.messageAuthenticated);
        section.messageAnonymous = this.fillUserData(section.messageAnonymous);
      }
    }

    return sections;
  }

  private fillUserData(html: string): string {
    if (this.user) {
      if (html.includes('user.points')) {
        html = this.replacePoints(html);
      }

      const expressions = html.match(/{{[a-zA-Z]+(\.[a-zA-Z]+)*}}/gi);

      if (expressions) {
        expressions.forEach(expression => {
          let value = '';
          const variable = expression.replace(/[{}\s\n\t]/gi, '');

          try {
            // tslint:disable-next-line:no-eval
            value = eval('this.' + variable);
          } catch (e) {
            console.error('error on eval', variable);
          }

          html = html.replace(expression, value);
        });
      }
    }

    return html;
  }

  private replacePoints(html: string): string {
    if (this.user) {
      const points = formatNumber(this.user.points, 'es-CO', '1.0');
      return html.replace(/{{ *user\.points *}}/gi, '<span class="text-xs inline-block align-middle relative rounded-full pl-small ' + 
        'bg-primary-500 word-s-1 pr-2 p-small rounded-full text-white border-2 border-orange-400 font-bold leading-none">' +
        '  <img class="inline-block align-middle" src="./assets/images/points-bubble.png?v=637408799586700000">\n' +
        '  <span class="inline-block align-middle product-points">' + points + '</span> pts\n' +
        '  <img class="inline-block align-middle points-stars" src="./assets/images/points-stars.png?v=637408799587870000"></span>');
    }

    return html;
  }
}