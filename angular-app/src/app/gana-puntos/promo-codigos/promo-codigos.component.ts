import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DialogService } from 'src/app/dialog/dialog-service/dialog.service';
import { PromoCodigosService } from './promo-codigos.service';


@Component({
  selector: 'app-promo-codigos',
  templateUrl: './promo-codigos.component.html',
  styleUrls: ['./promo-codigos.component.scss']
})
export class PromoCodigosComponent implements OnInit {
  observerTokenSubs: Subscription = null;
  loading: boolean = false;
  codigo: string = '';

  constructor(
    private promoCodService: PromoCodigosService,
    private _authSvc: AuthService,
    private dialogService: DialogService,
  ) { }

  observerToken() {
    this.observerTokenSubs = this._authSvc.token$.subscribe(token => {
      this.promoCodService.getHeaders(token);
    });
  }

  ngOnInit(): void {
    if (!this._authSvc.tokenCustom) {
      this.observerToken();
    } else {
      this.promoCodService.getHeaders(this._authSvc.tokenCustom);
    }
  }

  redeemPromoCode() {
    this.loading = true;
    this.promoCodService.sendCode(this.codigo).subscribe((res: any) => {
      this.clearInput();
      this.loading = false;
      const message: string = 'Obtuviste ' + res.data.points + ' puntos';
      this.dialogService.showMessage('information', message, '¡Has redimido exitosamente tu código!', 'CONTINUAR')
    },
      (error: any) => {
        this.clearInput();
        this.loading = false;
        console.log(JSON.stringify(error));
        switch (error.error.status) {
          case 422:
            return this.dialogService.showMessageError('¡Algo salió mal!', 'El código ingresado ya fue escaneado o expiró.', 'INTENTAR DE NUEVO');

          case 404:
            return this.dialogService.showMessageError('¡Algo salió mal!', 'No fue posible encontrar este código 🙁', 'INTENTAR DE NUEVO');

          default:
            console.error('error');
            return this.dialogService.showMessageError('¡Lo sentimos!', 'Hubo un error, inténtalo más tarde.', 'INTENTAR DE NUEVO');
        }
      }
    );
  }

  clearInput() {
    this.codigo = null;
  }
}
