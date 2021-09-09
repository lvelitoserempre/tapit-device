import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { UserAccount } from '../user/user-account';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { DrupalService } from '../services/drupal.service';
import { formatNumber } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from '../services/auth/auth.service';
import { CookieService } from 'ngx-cookie';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isOnWebView = false;
  user: UserAccount;
  points: number;
  sections: any[];

  sliderConfig = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          centerPadding: '20px'
        }
      }
    ]
  };
  catalogConfig = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: (window.innerWidth < 768 ? 3 : 8),
    slidesToScroll: 1,
    variableWidth: false,
    height: '280px'
  };
  recommendedConfig = {
    arrows: false,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private drupalService: DrupalService,
    private ngxService: NgxUiLoaderService,
    private authService: AuthService,
    private cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.authService.getDrupalToken()
    .subscribe(_ => {
      this.ngxService.start();
      this.getHomePage();
      this.ngxService.stopAll();
    });
    this.getHomePage();
    const search = new URLSearchParams(window.location.search);
    if (search.get('source')) {
      this.isOnWebView = true;
    }
  }

  getHomePage(): void {
    this.drupalService.getPage('home')
    .pipe(map(sections => this.fillPlaceholders(sections)))
    .subscribe(sections => {
      this.sections = sections;
    });
    if (isPlatformBrowser) {
      const path = this.cookieService.get('LOGIN_REDIRECTION');
      if (path && path.includes('#') && this.cookieService.get('DRUPAL_SESSION')) {
        const section = document.getElementById(path.replace('#', ''));
        if (section)
          window.scrollTo(0, section.offsetTop);
      }
    }
  }

  private fillPlaceholders(sections: any[]): any[] {
    for (const section of sections) {
      if (section && section.type === 'userText' && section.permissions.logged == true) {
        const loggedMessage = section.body;
        section.body = "CARGANDO...";
        if (isPlatformBrowser(this.platformId)) {
          this.angularFireAuth.user
          .subscribe(user => {
            this.angularFirestore.collection('user_account_tap').doc(user?.uid).valueChanges()
            .subscribe(user => {
              this.user = user;
              section.body = this.fillUserData(loggedMessage);
            })
          })
        }
      }
    }
    return sections
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

  public scrollToSection(sectionId: string, target: string): void {
    if (target == '_self') {
      let cleanedSectionId = sectionId.substring(1, sectionId.length);
      let section = document.getElementById(cleanedSectionId);
      window.scrollTo(0, section.offsetTop);
    } else {
      var externalLinkButton = document.createElement('a');
      externalLinkButton.target = target;
      externalLinkButton.href = sectionId;
      externalLinkButton.click();
      externalLinkButton.remove();
    }
  }
}
