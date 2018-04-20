import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemEditPage } from '../item-edit/item-edit';

/**
 * Generated class for the ItemDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {

  viewedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailsPage');
    this.viewedItem = this.navParams.get('collectionItem');
    console.log(this.viewedItem)
  }

  editDetails(item){
    this.navCtrl.push(ItemEditPage, {item:this.viewedItem})
    // console.log(item)
  }

}
