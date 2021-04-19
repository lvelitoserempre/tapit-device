import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService} from '../profile/profile.service';

// Helpers
import { scrollTop } from '../../helpers/scrollTop.helper';

// Components
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  items: any = [
    {date: '30/12/2020', icon: 'heart.svg', typePoints: true, points: 120, text: 'Por otros conceptos', number: 548537464},
    {date: '30/12/2020', icon: 'cart.svg', typePoints: false, points: 120, text: 'Por compra', number: 548537464},
    {date: '30/12/2020', icon: 'starship.svg', typePoints: true, points: 120, text: 'Por onboarding quiz', number: 548537464},
    {date: '30/12/2020', icon: 'qrcode.svg', typePoints: true, points: 60, text: 'Por QR code', number: 548537464},
    {date: '30/12/2020', icon: 'ticket.svg', typePoints: true, points: 60, text: 'Por promo code', number: 548537464},
    {date: '30/12/2020', icon: 'users.svg', typePoints: true, points: 120, text: 'Por referir a un amigo', number: 548537464},
    {date: '30/12/2020', icon: 'invoice.svg', typePoints: true, points: 80, text: 'Por escanear recibo', number: 548537464},
    {date: '30/12/2020', icon: 'trophy.svg', typePoints: true, points: 130, text: 'Por juego ó trivia', number: 548537464},
    {date: '30/12/2020', icon: 'cart.svg', typePoints: false, points: 120, text: 'Por compra', number: 548537464},
    {date: '30/12/2020', icon: 'cart.svg', typePoints: true, points: 70, text: 'Por compra', number: 548537464}
  ]; 
  itemsExists: boolean;

  constructor(
    private router: Router,
    private ps: ProfileService,
    private _profileComponent: ProfileComponent
  ) { }

  ngOnInit(): void {
    this.items.length > 0 ? this.itemsExists = true : this.itemsExists = false;
  }

  goBack() {
    scrollTop();
    this._profileComponent.showNavbar = true;
    setTimeout(() => {
      this.router.navigateByUrl('/user/profile');
      this.ps.next(true);
    }, 300);
  }

}
