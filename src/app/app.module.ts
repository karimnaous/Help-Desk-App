import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PopoverPageModule } from './employee/popover/popover.module';
import { ModalPageModule } from './employee/modal/modal.module';
// import { IonicStorageModule } from '@ionic/storage';
import { ModalAdminPageModule } from './modal-admin/modal-admin.module';
import { ModalAddPageModule } from './modal-add/modal-add.module';
import { ModalViewPageModule } from './modal-view/modal-view.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    PopoverPageModule, 
    ModalPageModule,
    HttpClientModule,
    ModalAdminPageModule,
    ModalAddPageModule,
    ModalViewPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
