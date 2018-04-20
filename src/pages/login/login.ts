import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';

import { SignupPage } from '../signup/signup';
import { CollectionPage } from '../collection/collection';

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
      public userProvider: UserProvider,
      public loadingCtrl: LoadingController,
      public storage: Storage,
      public events: Events) {

        this.loginForm = this.formBuilder.group({
          email:['',Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
          password:['',Validators.compose([Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"), Validators.required])]
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    this.showLoader();

    this.checkAuthentication();
  }

  checkAuthentication(){
    this.authProvider.checkAuthentication().then((res)=>{
    console.log("Already authorized");
    this.storage.get('userId').then((value)=>{
      this.userProvider.getProfile(value).then((result)=>{
        var user = result
        console.log(user)
        this.events.publish('user:alreadyLogin', user)
        })
      })
      this.loading.dismiss();
      this.navCtrl.setRoot(CollectionPage); 
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
      this.navCtrl.setRoot(CollectionPage)

      var user = result['user']
      this.events.publish('user:login', user)
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
