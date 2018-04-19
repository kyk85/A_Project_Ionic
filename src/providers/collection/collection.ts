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

  getCollection(userId){
    return new Promise ((resolve,reject)=>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': this.authProvider.token
        })
      }

      this.http.get('https://a-project-ada.herokuapp.com/api/book/' + userId, httpOptions)
        .subscribe(data=>{
          resolve(data);
        },(err) =>{
          reject(err);
          }
        )
    })
  }

  addItem(userId, item){
    return new Promise((resolve,reject)=>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.authProvider.token
        })
      }
      
      this.http.post('https://a-project-ada.herokuapp.com/api/book/' + userId, JSON.stringify(item), httpOptions)
        .subscribe(res =>{
          resolve(res);
        }, (err) =>{
          reject(err)
        })
    })
  }

  editItem(userId, bookId, item){
    return new Promise((resolve,reject)=>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.authProvider.token
        })
      }
      
      this.http.post('https://a-project-ada.herokuapp.com/api/book/' + userId + '/' + bookId, JSON.stringify(item), httpOptions)
        .subscribe(res =>{
          resolve(res);
        }, (err) =>{
          reject(err)
        })
    })
  }


  deleteItem(userId, bookId){
    return new Promise((resolve,reject)=>{

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': this.authProvider.token
        })
      }

      this.http.delete('https://a-project-ada.herokuapp.com/api/book/' + userId + '/' + bookId, httpOptions)
      .subscribe((res)=>{
        resolve(res)
      }, (err)=>{
        reject(err)
      })
    })
  }
}
