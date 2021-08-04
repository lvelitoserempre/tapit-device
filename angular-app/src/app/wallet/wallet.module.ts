import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from './wallet.component';
import { PromosComponent } from './promos/promos.component';
import { CuponsComponent } from './cupons/cupons.component';
import { ShopPointsComponent } from './shop-points/shop-points.component';
import { PromoCardComponent } from './promos/promo-card/promo-card.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll'



@NgModule({
  declarations: [WalletComponent, PromosComponent, CuponsComponent, ShopPointsComponent, PromoCardComponent, ModalWindowComponent],
  imports: [
    CommonModule, InfiniteScrollModule
  ]
})
export class WalletModule { }
