import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireRemoteConfigModule} from '@angular/fire/remote-config';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import localeEs from '@angular/common/locales/es-CO';
import {registerLocaleData} from '@angular/common';
import {TransferHttpCacheModule } from '@nguniversal/common';
import {BrowserstateInterceptor} from './browserstate.interceptor'

registerLocaleData(localeEs, 'es-CO');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    HttpClientModule,
    AppRoutingModule,
    SlickCarouselModule,
    AngularFireModule.initializeApp(environment.firebase.config),
    AngularFireAuthModule,
    AngularFireRemoteConfigModule,
    TransferHttpCacheModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BrowserstateInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
