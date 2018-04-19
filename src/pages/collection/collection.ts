import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';

// Controller Imports
import { ModalController, AlertController, LoadingController } from 'ionic-angular';

// Page Imports
import { LoginPage } from '../login/login';
import { ItemCreatePage } from '../item-create/item-create';

// Provider Imports
import { AuthProvider } from '../../providers/auth/auth';
import { CollectionProvider } from '../../providers/collection/collection';

/**
 * Generated class for the CollectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-collection',
  templateUrl: 'collection.html',
})
export class CollectionPage {

  collectionItems: any;
  loading: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public authProvider: AuthProvider,
              public collectionProvider: CollectionProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CollectionPage');
    
    this.showLoader();

    this.collectionProvider.getCollection().then((data)=>{
      this.collectionItems = data;
      console.log(this.collectionItems)
      this.loading.dismiss();
    }).catch(error=>{
      console.log("Not Authorized")
    })
  }

  goToItemCreate(){
    this.navCtrl.push(ItemCreatePage);
  }

  deleteItem(item){
    this.showLoader();

    console.log(item._id)

    this.collectionProvider.deleteItem(item._id).then((result)=>{
      this.loading.dismiss();

      let index = this.collectionItems.indexOf(item)

      if (index > -1){
        this.collectionItems.splice(index, 1);
      }
    }).catch(error=>{
      this.loading.dismiss()
      console.log("Error Deleting Item")
    })
  }

  logout(){
    this.authProvider.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  showLoader(){
    this.loading = this.loadingCtrl.create()
    this.loading.present();
  }

}
