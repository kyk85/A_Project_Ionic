import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// Controller Imports
import { ModalController, AlertController, LoadingController } from 'ionic-angular';

// Page Imports
import { LoginPage } from '../login/login';
import { ItemCreatePage } from '../item-create/item-create';
import { ItemDetailsPage } from '../item-details/item-details';

// Provider Imports
import { AuthProvider } from '../../providers/auth/auth';
import { CollectionProvider } from '../../providers/collection/collection';
import { UserProvider } from '../../providers/user/user';




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
  userId: any;
  public userProfile: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public authProvider: AuthProvider,
              public collectionProvider: CollectionProvider,
              public userProvider: UserProvider,
              public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CollectionPage');
    this.showLoader();
    this.getCollection();
  }

  getCollection(){
    this.storage.get('userId').then((value) =>{
      this.userId = value
      this.collectionProvider.getCollection(value).then((data)=>{
        this.collectionItems = data['library'];
        // console.log(this.collectionItems)
        this.loading.dismiss();
      }).catch(error=>{
        console.log("Not Authorized")
      })
    })
  }

  goToItemCreate(){
    this.navCtrl.push(ItemCreatePage);
  }

  goToItemDetails(item){
    this.navCtrl.push(ItemDetailsPage, {collectionItem:item});
  }

  deleteItem(item){
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Are you sure you want to delete this?',
      buttons: [
        {
          text:'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelled')
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.showLoader();
            // console.log(item._id)
            this.collectionProvider.deleteItem(this.userId, item._id).then((result)=>{
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
        }
      ]
    });
    alert.present();
  }

  // deleteItem(item){
  //   this.showLoader();
  //   // console.log(item._id)
  //   this.collectionProvider.deleteItem(this.userId, item._id).then((result)=>{
  //     this.loading.dismiss();

  //     let index = this.collectionItems.indexOf(item)

  //     if (index > -1){
  //       this.collectionItems.splice(index, 1);
  //     }
  //   }).catch(error=>{
  //     this.loading.dismiss()
  //     console.log("Error Deleting Item")
  //   })
  // }

  logout(){
    this.authProvider.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  showLoader(){
    this.loading = this.loadingCtrl.create()
    this.loading.present();
  }

}
