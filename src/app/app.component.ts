import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isAuth: boolean;
  ngOnInit() {
    firebase.default.initializeApp(environment.firebase);
    firebase.default.auth().onAuthStateChanged((user) => {
      console.log('un changement à été observé');
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
    return false;
  }
}
