import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../service/database.service"
import * as fb from 'firebase';
import { User } from '../models/user.model';
import { Conversation } from '../models/conversation.model';
import { KeyService } from "../key.service";
import { Input } from '@angular/core';
import { chat } from '../models/chat.model';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  constructor(private db: DatabaseService, private keyService: KeyService) {}

  @Input() users: User[];
  @Input() currentUser;

  showCurrentUser(){
    console.log(this.currentUser);
  }
  ngOnInit(): void {}

  talkto(uid) {
    if (!this.checkExistingConversation(uid)) {
      this.initconv(uid);
    }
  }

  checkExistingConversation(uid): boolean {
    let userListFiltered = this.users.filter((user) => {
      return user.uid === this.currentUser.uid;
    });
    let conversationFiltered = userListFiltered[0].conversations.filter(
      (conv) => {
        return conv.uidParticipants.includes(uid);
      }
    );
    return conversationFiltered.length > 0;
  }

  initconv(uid) {
    //if conversation does not already existing
    let conversationKey: string = this.keyService.generateKey(uid);
    let emmeteurFiltered = this.users.filter((user) => {
      return user.uid === this.currentUser.uid;
    });
    let destinataireFiltered = this.users.filter((user) => {
      return user.uid === uid;
    });
    let emmeteur = emmeteurFiltered[0];
    let destinataire = destinataireFiltered[0];
    let newConversation: Conversation = {
      uidParticipants: [this.currentUser.uid, uid],
      keyConversation: conversationKey,
      nomDeConversation: emmeteur.username+" - "+destinataire.username,
    };
    let newChat: chat = {
      messages: [{ message: '', emmeteurUid: 'none', timestamp: new Date() }],
      keyConv: conversationKey,
    };

    this.db.save('/chats/' + conversationKey, newChat);
    destinataire.conversations.push(newConversation);
    emmeteur.conversations.push(newConversation);
    this.db.update('/user/' + fb.default.auth().currentUser.uid, emmeteur);
    this.db.update('/user/' + uid, destinataire);
  }
}
