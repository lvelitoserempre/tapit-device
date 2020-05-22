import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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
import {SocialMediaComponent} from './social-media/social-media.component';
import { FacebookComponent }    from './social-media/facebook/facebook.component';
import { TwitterComponent }    from './social-media/twitter/twitter.component';
import { WhatsappComponent } from './social-media/whatsapp/whatsapp.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppHeaderComponent,
    AppFooterComponent,
    FinalMessageComponent,
    SocialMediaComponent,
    FacebookComponent,
    TwitterComponent,
    WhatsappComponent
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
  bootstrap: [AppComponent]
})
export class AppModule {
}
