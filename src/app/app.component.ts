import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';

import { Storage } from '@ionic/storage';

// Page Imports
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CollectionPage } from '../pages/collection/collection';
import { ProfileDetailsPage } from '../pages/profile-details/profile-details';

// Provider Imports
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  user: any;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public authProvider: AuthProvider,
              public userProvider: UserProvider,
              public storage: Storage,
              public events: Events) {

  this.initializeApp();
  events.subscribe('user:login', (user)=>{
    this.user = user;
    console.log(this.user)
  })

  events.subscribe('user:alreadyLogin', (user)=>{
    this.user = user;
    console.log(this.user)
  })

  events.subscribe('user:signup', (user)=>{
    this.user = user;
    console.log(this.user)
  })

  events.subscribe('user:edited', (user)=>{
    this.user = user;
    console.log(this.user)
  })

  // used for an example of ngFor and navigation
  this.pages = [
    // { title: 'Home', component: HomePage },
    { title: 'Profile', component: ProfileDetailsPage },
    { title: 'Collection', component: CollectionPage }
  ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  editProfile(){
  }

  logout(){
    this.authProvider.logout();
    this.nav.setRoot(LoginPage);
  }
}
