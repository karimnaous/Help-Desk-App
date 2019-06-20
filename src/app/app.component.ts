import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
//import { user-edit} from "@fortawesome/fontawesome-free";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'fas fa-home'
    },
    {
      title: 'Employee',
      url: '/employee',
      icon: 'fas fa-users'
     
    },
    {
      title: 'Officer',
      url: '/officermain',
      icon: 'fas fa-user-cog'
    },

    {title: 'Secretary',
      url: '/secretary',
      icon: 'fas fa-tty'
    },
    { 
      title: 'Admin',
      url: '/admin',
      icon: 'fas fa-user-plus'

    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
