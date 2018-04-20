import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CollectionProvider } from '../../providers/collection/collection';
import { AuthProvider } from '../../providers/auth/auth';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, 
      public collectionProvider:CollectionProvider,
      public authProvider:AuthProvider) {

  }
}
