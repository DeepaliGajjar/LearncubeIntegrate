import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'learnCubeAPI';

  constructor(private auth:AuthenticationService){}
  ngOnInit(){
    console.log(localStorage.getItem("token"),"-from localstorage")
  }
  RequestToken(){
    this.auth.createClass()
  }
}