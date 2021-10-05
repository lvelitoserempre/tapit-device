import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/dialog/dialog-service/dialog.service';
import { PromoCodigosService } from './promo-codigos.service';


@Component({
  selector: 'app-promo-codigos',
  templateUrl: './promo-codigos.component.html',
  styleUrls: ['./promo-codigos.component.scss']
})
export class PromoCodigosComponent implements OnInit {
  loading: boolean = false;
  codigo: string = '';

  constructor(
    private promoCodService: PromoCodigosService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void { }

  redeemPromoCode() {
    this.loading = true;
    this.promoCodService.sendCode(this.codigo).subscribe((res: any) => {
      this.clearInput();
      this.loading = false;
      const message: string = 'Obtuviste ' + res.data.points + ' puntos';
      this.dialogService.showMessageOK('informationCodes', message, '¡Has redimido exitosamente tu promocódigo!', 'CONTINUAR')
    },
      (error: any) => {
        this.clearInput();
        this.loading = false;
        switch (error.error.status) {
          case 422:
            return this.dialogService.showMessageError('¡Algo salió mal!', 'El promocódigo ingresado ya fue redimido o expiró.', 'INTENTAR DE NUEVO');

          case 404:
            return this.dialogService.showMessageError('¡Algo salió mal!', 'No fue posible encontrar este promocódigo 🙁', 'INTENTAR DE NUEVO');

          default:
            console.error('error');
            return this.dialogService.showMessageError('¡Lo sentimos!', 'Hubo un error, inténtalo más tarde.', 'INTENTAR DE NUEVO');
        }
      }
    );
  }

  clearInput() {
    this.codigo = '';
  }
}
