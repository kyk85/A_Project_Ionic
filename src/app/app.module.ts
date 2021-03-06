import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Page Imports
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { CollectionPage } from '../pages/collection/collection';
import { ItemCreatePage } from '../pages/item-create/item-create';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ItemEditPage } from '../pages/item-edit/item-edit';
import { ProfileEditPage } from '../pages/profile-edit/profile-edit';
import { ProfileDetailsPage } from '../pages/profile-details/profile-details';

// Module Imports
// import { Storage } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

// Provider Imports
import { CollectionProvider } from '../providers/collection/collection';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    CollectionPage,
    ItemCreatePage,
    ItemDetailsPage,
    ItemEditPage,
    ProfileDetailsPage,
    ProfileEditPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    CollectionPage,
    ItemCreatePage,
    ItemDetailsPage,
    ItemEditPage,
    ProfileDetailsPage,
    ProfileEditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CollectionProvider,
    AuthProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider
  ]
})
export class AppModule {}
