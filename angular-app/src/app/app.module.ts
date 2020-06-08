import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {AppHeaderComponent} from './app-header/app-header.component';
import {AppFooterComponent} from './app-footer/app-footer.component';
import {FinalMessageComponent} from './final-message/final-message.component';
import {DialogModule} from './dialog/dialog.module';
import {LoaderModule} from './loader/loader.module';
import {AppCommonModule} from './app-common.module';
import localeEs from '@angular/common/locales/es-CO';
import {registerLocaleData} from '@angular/common';

registerLocaleData(localeEs, 'es-CO');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppHeaderComponent,
    AppFooterComponent,
    FinalMessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DialogModule,
    LoaderModule,
    HttpClientModule,
    AppCommonModule,
    SlickCarouselModule,
  ],
  bootstrap: [AppComponent],
  providers: [{provide: LOCALE_ID, useValue: 'es-CO' }]
})
export class AppModule {
}
