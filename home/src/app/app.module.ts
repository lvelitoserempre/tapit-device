import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
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
import {FormsModule} from "@angular/forms";

registerLocaleData(localeEs, 'es-CO');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AgeGateComponent,
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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
}
