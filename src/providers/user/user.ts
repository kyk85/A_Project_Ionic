import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { AuthProvider } from '../auth/auth'


/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: HttpClient, public authProvider: AuthProvider) {
    console.log('Hello UserProvider Provider');
  }

  getProfile(userId){
    return new Promise ((resolve,reject)=>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': this.authProvider.token
        })
      }

      this.http.get('https://a-project-ada.herokuapp.com/api/user/' + userId, httpOptions)
        .subscribe(data=>{
          resolve(data);
        },(err) =>{
          reject(err);
          }
        )
    })
  }

  editProfile(userId, editedUser){
    return new Promise((resolve,reject)=>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.authProvider.token
        })
      }
      
      this.http.post('https://a-project-ada.herokuapp.com/api/user/' + userId, JSON.stringify(editedUser), httpOptions)
        .subscribe(res =>{
          resolve(res);
        }, (err) =>{
          reject(err)
        })
    })
  }

}
