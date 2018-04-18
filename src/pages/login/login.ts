import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup
  submitAttempt: boolean = false;
  loading: any;

  // email: string;
  // password: string;

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      public formBuilder: FormBuilder,
      public authProvider: AuthProvider,
      public loadingCtrl: LoadingController) {

        this.loginForm = this.formBuilder.group({
          email:[''],
          password:['']
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    this.showLoader();

    this.authProvider.checkAuthentication().then((res)=>{
      console.log("Already authorized");
      this.loading.dismiss();
      this.navCtrl.setRoot(HomePage); 
    }).catch (error => {
      console.log("Not already abc authorized");
      this.loading.dismiss();
    })
  }

  login(){
    this.showLoader();

    let credentials = this.loginForm.value

    console.log(credentials);

    this.authProvider.login(credentials).then((result) => {
      this.loading.dismiss();
      this.navCtrl.setRoot(HomePage)
    }).catch(error => {
      this.loading.dismiss();
      console.log(error)
    })
  }

  launchSignup(){
    this.navCtrl.push(SignupPage);
  }

  showLoader(){
    this.loading = this.loadingCtrl.create()
    this.loading.present();
  }
}
