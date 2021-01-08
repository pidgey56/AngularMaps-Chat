import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.scss'],
})
export class NewChatComponent implements OnInit {
  constructor() {}

  userList: any[];

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    firebase.default
      .database()
      .ref('/user')
      .on('value', (data) => {
        if (data.val != null) {
          this.userList = Object.values(data.val());
        } else {
          console.log("too bad there's nothing here");
        }
      });
  }
}
