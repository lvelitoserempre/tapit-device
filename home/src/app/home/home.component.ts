import {Component} from '@angular/core';
import {UserAccount} from '../user/user-account';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {DrupalService} from '../services/drupal.service';
import {formatNumber} from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
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
    private ngxService: NgxUiLoaderService
  ) {
    this.ngxService.start();
    this.drupalService.getPage('home')
    .pipe(map(sections => this.fillPlaceholders(sections)))
    .subscribe(sections => {
      this.sections = sections;
      this.ngxService.stop();
    });
  }

  private fillPlaceholders(sections: any[]): any[] {
    for (const section of sections) {
      if (section && section.type === 'userText') {
        this.angularFireAuth.user
          .pipe(switchMap(user => {
            return user ? this.angularFirestore.collection('user_account_tap').doc(user.uid).valueChanges() : of(null);
          }))
          .subscribe(user => {
            this.user = user;
            section.show = (user && !section.permissions?.logged) || (!user && section.permissions?.logged) ? false : true
            section.body = this.fillUserData(section.body);
          });
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
      externalLinkButton.target= target;
      externalLinkButton.href=sectionId;
      externalLinkButton.click();
      externalLinkButton.remove();
    }
  }
}
