import { Component, Input, OnInit } from '@angular/core';
import { KeyService } from '../key.service';
import { chat } from '../models/chat.model';
import { Conversation } from '../models/conversation.model';
import { User } from '../models/user.model';
import { DatabaseService } from '../service/database.service';
import * as fb from 'firebase';

@Component({
  selector: 'app-find-user',
  templateUrl: './find-user.component.html',
  styleUrls: ['./find-user.component.scss']
})
export class FindUserComponent implements OnInit {
  @Input() users: User[];
  @Input() currentUser;
  input : string;
  usersFiltered : User[];

  constructor(private db: DatabaseService, private keyService: KeyService) { }

  ngOnInit(): void {
  }

  filter(){
    this.usersFiltered = this.users.filter((user)=>{
      return user.username == this.input || user.email == this.input;
    })
    this.input = '';
  }

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
      nomDeConversation: emmeteur.username + ' - ' + destinataire.username,
    };
    let newChat: chat = {
      messages: [],
      keyConv: conversationKey,
    };

    this.db.save('/chats/' + conversationKey, newChat);
    destinataire.conversations.push(newConversation);
    emmeteur.conversations.push(newConversation);
    this.db.update('/user/' + fb.default.auth().currentUser.uid, emmeteur);
    this.db.update('/user/' + uid, destinataire);
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.filter();
    }
  }

}
