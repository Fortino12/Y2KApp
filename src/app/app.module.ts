import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//En este archivo se importa los plugins y los modulos para que se puedan utilizar de forma global
//Plugin instalados
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
//Modulo de http serviara para acceder con servicios del back-end
import { HttpClientModule }    from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,],//aquí se importa solo los modulo
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ,NativeStorage,
    EmailComposer,
    Camera,
    LocalNotifications,
    WebView
  ],//En el array de los providers se declaran todos los plugins
  bootstrap: [AppComponent],
})
export class AppModule {}
