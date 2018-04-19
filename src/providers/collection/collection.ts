import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage';

// Provider Imports
import { AuthProvider } from '../auth/auth'

/*
  Generated class for the CollectionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CollectionProvider {

  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Authorization': this.authProvider.token
  //   })
  // }

  constructor(public http: HttpClient, public authProvider: AuthProvider) {
    console.log('Hello CollectionProvider Provider');
  }

  getCollection(){
    return new Promise ((resolve,reject)=>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': this.authProvider.token
        })
      }

      this.http.get('https://a-project-ada.herokuapp.com/api/book/', httpOptions)
        .subscribe(data=>{
          resolve(data);
        },(err) =>{
          reject(err);
          }
        )
    })
  }

  addItem(item){
    return new Promise((resolve,reject)=>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.authProvider.token
        })
      }
      
      this.http.post('https://a-project-ada.herokuapp.com/api/book/', JSON.stringify(item), httpOptions)
        .subscribe(res =>{
          resolve(res);
        }, (err) =>{
          reject(err)
        })
    })
  }

  deleteItem(id){
    return new Promise((resolve,reject)=>{

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': this.authProvider.token
        })
      }

      this.http.delete('https://a-project-ada.herokuapp.com/api/book/' + id, httpOptions)
      .subscribe((res)=>{
        resolve(res)
      }, (err)=>{
        reject(err)
      })
    })
  }
}
