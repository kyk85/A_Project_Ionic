import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
// import { Headers } from '@angular/http';
// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Rx';
// import { HttpErrorResponse } from '@angular/common/http/src/response';
// import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
// import { errorHandler } from '@angular/platform-browser/src/browser';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  public token: any;

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello AuthProvider Provider');
  }

  checkAuthentication(){
    
    return new Promise ((resolve, reject)=>{
      this.storage.get('token').then((value)=>{
        this.token = value;
        console.log(this.token)

        const httpOptions = {
          headers: new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.token
          })
        }

        let headers = new Headers();
        headers.append('Authorization', this.token);

        this.http.get('https://a-project-ada.herokuapp.com/api/auth/protected', httpOptions)
        .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });

        })
      })
    }
  

  createAccount(details){
    return new Promise((resolve,reject) => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // 'Authorization': this.token
        })
      }

      this.http.post('https://a-project-ada.herokuapp.com/api/auth/register', JSON.stringify(details), httpOptions)
        .subscribe(res => {
          let data = res
          this.token = data['token'];
          this.storage.set('token', data['token']);
          resolve(data);
        }, (err) => {
          reject(err);
        })
    })
  }

  login(credentials){
    return new Promise((resolve,reject)=>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // 'Authorization': this.token
        })
      }

      this.http.post('https://a-project-ada.herokuapp.com/api/auth/login', JSON.stringify(credentials), httpOptions)
        .subscribe(res => {
          let data = res
          this.token = data['token'];
          this.storage.set('token', data['token']);
          resolve(data);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  logout(){
    this.storage.set('token', '');
  } 

  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent){
  //     console.error('An error has occured', error.error.message)
  //   } else {
  //     console.error(
  //     `Backend returned code ${error.status}, ` +
  //     `body was: ${error.error}`);
  //   }
  //   return new ErrorObservable(
  //     'Something bad happened'
  //   )
  // }
}
