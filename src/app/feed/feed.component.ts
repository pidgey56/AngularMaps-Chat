import { Component, Input, OnInit } from '@angular/core';
import { chat } from '../models/chat.model';
import { Conversation } from '../models/conversation.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  constructor() {}
  @Input() currentConversation: Conversation;
  @Input() currentUser;
  @Input() currentChat: chat;

  ngOnInit(): void {
    
  }


}
