import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { chat } from '../models/chat.model';
import { Conversation } from '../models/conversation.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  constructor(private feedContainer : ElementRef) {}
  private scrollContainer: any;
  previousScrollHeight = 0;

  @Input() currentConversation: Conversation;
  @Input() currentUser;
  @Input() currentChat: chat;

  ngOnInit(): void {

  }

  ngAfterViewChecked() {
    this.scrollContainer = this.feedContainer.nativeElement;
    if(this.previousScrollHeight < this.scrollContainer.scrollHeight){
      this.scrollToBottom();
      this.previousScrollHeight = this.scrollContainer.scrollHeight;
    }
  }

  scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      behavior: "smooth",
    });
  }

  

}
