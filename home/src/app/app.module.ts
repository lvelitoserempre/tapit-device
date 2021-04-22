import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {VerifyIdentityComponent} from './verify-identity/verify-identity.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireRemoteConfigModule} from '@angular/fire/remote-config';
import {HttpClientModule} from '@angular/common/http';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import localeEs from '@angular/common/locales/es-CO';
import {registerLocaleData} from '@angular/common';
import {TransferHttpCacheModule } from '@nguniversal/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AgeGateComponent } from './age-gate/age-gate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule
} from "ngx-ui-loader";

import { BrowserCookiesModule } from 'ngx-cookie-universal';

registerLocaleData(localeEs, 'es-CO');
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  blur: 5,
  fastFadeOut: true,
  fgsColor: "#ff5005",
  fgsPosition: "center-center",
  fgsSize: 70,
  fgsType: "chasing-dots",
  gap: 55,
  masterLoaderId: "master",
  text: "CARGANDO",
  textColor: "white",
  textPosition: "center-center",
  maxTime: -1,
  minTime: 300,
  overlayColor: "rgba(40,40,40,0.9)",
  hasProgressBar: false
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AgeGateComponent,
    VerifyIdentityComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    HttpClientModule,
    AppRoutingModule,
    SlickCarouselModule,
    AngularFireModule.initializeApp(environment.firebase.config),
    AngularFireAuthModule,
    AngularFireRemoteConfigModule,
    TransferHttpCacheModule,
    NgbModule,
    FormsModule, ReactiveFormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    BrowserCookiesModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
}
