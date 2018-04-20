import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';


import { UserProvider } from '../../providers/user/user';

import { CollectionPage } from '../collection/collection';
import { ProfileDetailsPage } from '../profile-details/profile-details';


/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {

  userProfile: any;
  editProfileForm: FormGroup;
  loading: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public formBuilder: FormBuilder,
              public userProvider: UserProvider,
              public storage: Storage,
              public events: Events) {

                this.editProfileForm = this.formBuilder.group({
                  displayName:['']
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileEditPage');
    this.userProfile = this.navParams.get('user');
    console.log(this.userProfile)
  }

  editProfile(){
    this.showLoader();

    this.storage.get('userId').then((value)=>{
      let userId = value
      let details = this.editProfileForm.value

      this.userProvider.editProfile(userId, details).then((result)=>{
        this.loading.dismiss();
        this.navCtrl.setRoot(CollectionPage);
        var user = result
        console.log(user)
        this.events.publish('user:edited', user)
        
      }).catch(error=>{
        this.loading.dismiss();
        console.log(error)
      })
    })
  }

  showLoader(){
    this.loading = this.loadingCtrl.create()
    this.loading.present();
  }

}
