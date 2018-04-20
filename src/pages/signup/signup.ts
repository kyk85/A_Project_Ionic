import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Events } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { CollectionPage } from '../collection/collection';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;
  submitAttempt: boolean = false;
  loading: any;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public authProvider: AuthProvider,
              public loadingCtrl: LoadingController,
              public events: Events) {

      this.signupForm = this.formBuilder.group({
        displayName:[''],
        email:['',Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
        password:['',Validators.compose([Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'), Validators.required])]
    });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup(){
    this.showLoader();
    let details = this.signupForm.value
    console.log(details)

    this.authProvider.createAccount(details).then((result)=>{
      this.loading.dismiss();
      this.navCtrl.setRoot(CollectionPage);
      var user = result['user']
      console.log(user)
      this.events.publish('user:signup', user)

    }).catch (error => {
      this.loading.dismiss();
    })
  }


  showLoader(){
    this.loading = this.loadingCtrl.create()
    this.loading.present();
  }
}
