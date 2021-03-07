import {
  NgModule
} from '@angular/core';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  AppRoutingModule
} from './app-routing.module';
import {
  IonicModule,
  IonicRouteStrategy
} from '@ionic/angular';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import {
  RouteReuseStrategy
} from '@angular/router';

import {
  AppComponent
} from './app.component';
import {
  FormsModule
} from '@angular/forms';
import {
  TokenInterceptor
} from './interceptors/token.interceptor';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy,
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
