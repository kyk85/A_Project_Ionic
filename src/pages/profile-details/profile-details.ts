import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { UserProvider } from '../../providers/user/user';
import { ProfileEditPage } from '../profile-edit/profile-edit';

/**
 * Generated class for the ProfileDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-details',
  templateUrl: 'profile-details.html',
})
export class ProfileDetailsPage {

  public user: any;
  public userId: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public userProvider: UserProvider,
              public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileDetailsPage');
    this.getProfile();
  }

  getProfile(){
    this.storage.get('userId').then((value)=>{
      this.userId = value
      this.userProvider.getProfile(this.userId).then((res)=>{
        this.user = res
        // console.log(this.user);
      })
    })
  }

  goToProfileEdit(user){
    this.navCtrl.push(ProfileEditPage,{user:this.user});
  }
}
