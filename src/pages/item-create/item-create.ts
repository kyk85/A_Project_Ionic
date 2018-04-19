import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, LoadingController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { AuthProvider } from '../../providers/auth/auth';
import { CollectionProvider } from '../../providers/collection/collection';
import { HomePage } from '../home/home';
import { CollectionPage } from '../collection/collection';

/**
 * Generated class for the ItemCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html',
})
export class ItemCreatePage {

  addItemForm: FormGroup;
  loading: any;


  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      public formBuilder: FormBuilder,
      // public authProvider: AuthProvider,
      public collectionProvider: CollectionProvider,
      public viewCtrl: ViewController,
      public loadingCtrl: LoadingController) {

        this.addItemForm = this.formBuilder.group({
          coverArt:[''],
          title:[''],
          author:[''],
          isbn:[''],
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemCreatePage');
  }

  addItem(){
    this.showLoader();
    let details = this.addItemForm.value
    console.log(details)
    
    this.collectionProvider.addItem(details).then((result)=>{
      this.loading.dismiss();
      
      // this.viewCtrl.dismiss();
      console.log(details.title + " added!")
      console.log(result)
      this.navCtrl.push(CollectionPage)
    }).catch(error=>{
      this.loading.dismiss();
      console.log(error)
    })
  }
  
  showLoader(){
    this.loading = this.loadingCtrl.create()
    this.loading.present();
  }

}
