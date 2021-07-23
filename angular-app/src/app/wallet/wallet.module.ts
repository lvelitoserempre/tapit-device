import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from './wallet.component';
import { PromosComponent } from './promos/promos.component';
import { CuponsComponent } from './cupons/cupons.component';
import { ShopPointsComponent } from './shop-points/shop-points.component';
import { PromoCardComponent } from './promos/promo-card/promo-card.component';



@NgModule({
  declarations: [WalletComponent, PromosComponent, CuponsComponent, ShopPointsComponent, PromoCardComponent],
  imports: [
    CommonModule
  ]
})
export class WalletModule { }
