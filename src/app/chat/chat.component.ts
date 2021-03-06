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
  constructor(private dbService: DatabaseService) { }

  message: string;
  @Input() currentUser: User;
  @Input() currentConversation: Conversation;
  @Input() currentChat: chat;
  ngOnInit(): void {

  }

  autogrow(maxChar: number) {
    let element = document.getElementById('input');
    let lineheight = 20;
    if (this.message != null) {
      let numberOfLineRequired = Math.floor(this.message.length / maxChar);
      element.style.height = numberOfLineRequired * lineheight + 'px';
    }
  }

  send() {
    if (this.message != null) {
      if (this.message.length >= 1) {
        if(this.currentChat.messages == null){
          this.currentChat = {
            keyConv: this.currentChat.keyConv,
            messages : []
          }
        }
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
