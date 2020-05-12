import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './modules/material/material.module';
import {NgModule} from '@angular/core';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {AppComponent} from './app.component';
import {DialogComponent} from './components/dialog/dialog.component';
import {HomeComponent} from './components/home/home.component';
import {LoaderComponent} from './components/loader/loader.component';
import {LoginComponent} from './components/login/login.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {MAT_DATE_LOCALE} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {AppHeaderComponent} from './app-header/app-header.component';
import {AppFooterComponent} from './app-footer/app-footer.component';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {FinalMessageComponent} from './components/final-message/final-message.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    HomeComponent,
    LoaderComponent,
    LoginComponent,
    SignUpComponent,
    AppHeaderComponent,
    AppFooterComponent,
    FinalMessageComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    NgxQRCodeModule,
    ReactiveFormsModule,
    SlickCarouselModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-CO'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
