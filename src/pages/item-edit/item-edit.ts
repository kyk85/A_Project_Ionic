import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, LoadingController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CollectionProvider } from '../../providers/collection/collection';
import { CollectionPage } from '../collection/collection';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the ItemEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-edit',
  templateUrl: 'item-edit.html',
})
export class ItemEditPage {

  editedItem: any;
  editForm: FormGroup;
  loading: any;
  userId: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public formBuilder: FormBuilder,
              public collectionProvider: CollectionProvider,
              public storage: Storage) {

                this.editForm = this.formBuilder.group({
                  coverArt:[''],
                  title:[''],
                  author:[''],
                  isbn:[''],
                })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemEditPage');
    this.editedItem = this.navParams.get('item')
    console.log(this.editedItem)
    
  }

  editItem(){
    this.showLoader();

    this.storage.get('userId').then((value)=>{
      this.userId = value
      let details = this.editForm.value
      let bookId = this.editedItem._id
      console.log(details)

      this.collectionProvider.editItem(this.userId, bookId, details).then((result)=>{
        this.loading.dismiss();
        console.log(details.title + " edited!")
        // console.log(result)
        this.navCtrl.setRoot(CollectionPage)
      }).catch(error=>{
        this.loading.dismiss();
        console.log(error)
      })
  
    })

    // let details = this.addItemForm.value
    // details.userId = this.authProvider.userId
    // console.log(details)

  }

  showLoader(){
    this.loading = this.loadingCtrl.create()
    this.loading.present();
  }

}
