import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { Conversation } from '../models/conversation.model';
import { User } from '../models/user.model';
import { AuthentificationService } from '../service/authentification.service';
import * as fb from 'firebase';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss'],
})
export class ChatContainerComponent implements OnInit {
  conversations: Conversation[];
  users: User[];
  currentUser = this.auth.currentUser();
  currentConversation: Conversation;
  receivedKey: string;
  currentChat;

  getConversationKey(key: string) {
    for (let conversation of this.conversations) {
      if (conversation.keyConversation === key) {
        this.currentConversation = conversation;
      }
    }
    this.getChat(key);
  }

  private getChat(key: string) {
    fb.default
      .database()
      .ref('/chats/' + key)
      .on('value', (data) => {
        if (data.val != null) {
          this.currentChat = data.val();
        }
      });
  }

  constructor(private auth: AuthentificationService) {}

  ngOnInit(): void {
    this.getUsersList();
    this.getConversations();
  }

  private getConversations() {
    fb.default
      .database()
      .ref('/user/' + this.currentUser.uid + '/conversations')
      .on('value', (data) => {
        if (data.val != null) {
          this.conversations = Object.values(data.val());
        } else {
          console.log("too bad there's nothing here");
        }
      });
  }

  private getUsersList() {
    fb.default
      .database()
      .ref('/user')
      .on('value', (data) => {
        if (data.val != null) {
          this.users = Object.values(data.val());
        } else {
          console.log("too bad there's nothing here");
        }
      });
  }
}
