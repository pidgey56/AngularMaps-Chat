import { Component, Input, OnInit } from '@angular/core';
import { chat } from '../models/chat.model';
import { Conversation } from '../models/conversation.model';
import { User } from '../models/user.model';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(private dbService: DatabaseService) {}
  message: string;

  @Input() currentUser: User;
  @Input() currentConversation: Conversation;
  @Input() currentChat: chat;
  ngOnInit(): void {}

  send() {
    if (this.message != null) {
      if (this.message.length >= 1) {
        console.log(this.currentChat);
        this.currentChat.messages.push({
          message: this.message,
          emmeteurUid: this.currentUser.uid,
          timestamp: new Date(),
        });
        this.dbService.update(
          '/chats/' + this.currentChat.keyConv,
          this.currentChat
        );
        this.message = '';
      }
    }
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }
}
