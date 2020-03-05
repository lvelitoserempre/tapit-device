// Modules
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { NgModule } from '@angular/core';
import { NgxQRCodeModule } from 'ngx-qrcode2';

// Components
import { AppComponent } from './app.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { EventItemComponent } from './components/event-item/event-item.component';
import { EventPlaceholderComponent } from './components/event-placeholder/event-placeholder.component';
import { HomeComponent } from './components/home/home.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up/sign-up.component';
import { MAT_DATE_LOCALE } from '@angular/material';

@NgModule({
  // Components
  declarations: [
    AppComponent,
    DialogComponent,
    EventItemComponent,
    EventPlaceholderComponent,
    HomeComponent,
    LoaderComponent,
    LoginComponent,
    SignUpComponent
  ],
  // Dynamically loaded components
  entryComponents: [
    DialogComponent
  ],
  // Modules
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    NgxQRCodeModule,
    ReactiveFormsModule
  ],
  // Services
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: 'googleTagManagerId', useValue: 'GTM-P3VW55B' }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
