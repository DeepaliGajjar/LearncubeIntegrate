import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  headers = new HttpHeaders({
    "Content-Type": "application/json"
  }); 
  
  options = { headers : this.headers }; //setting up the headers

  public token;

  apiData = {
    "api_public_key": "2d71b7d117fad1d6adf98e27",
     "api_private_key": "90090de84ace8f42af416d177288128dff3df7e5"
  } //api keys
  
  // date = new Date();
  // validRoom = {
  //   "type" : "room_init",
  //   "token" : "Class1707",
  //   "userid" : "1",
  //   "timestamp":this.date.getTime()
  // }

  constructor(private http:HttpClient) { }

  createClass(){
    this.http.post("https://app.learncube.com/api/virtual-classroom/get-api-token/",
      this.apiData, this.options) //getting api token
      .subscribe((res) => {

        console.log(res, "-generated token");
        this.token = res["token"];
        localStorage.setItem("token", this.token); //setting in local storage

        console.log(localStorage.getItem("token"), "-after setting in storage");

        this.http.post("https://app.learncube.com/api/virtual-classroom/verify-api-token/",
          { "token": res["token"] }, this.options) //verifying the token
          .subscribe((result) => {
            console.log(result, "-verified token");
            localStorage.removeItem("token");
          });

      })
  }
}