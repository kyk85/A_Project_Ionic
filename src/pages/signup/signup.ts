import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

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
    public loadingCtrl: LoadingController) {

      this.signupForm = this.formBuilder.group({
        email:[''],
        password:['']
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
      this.navCtrl.setRoot(HomePage);
    }).catch (error => {
      this.loading.dismiss();
    })
  }


  showLoader(){
    this.loading = this.loadingCtrl.create()
    this.loading.present();
  }
}
