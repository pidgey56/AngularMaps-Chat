import { Component, Input, OnInit, Output } from '@angular/core';
import { Conversation } from '../models/conversation.model';
import { AuthentificationService } from '../service/authentification.service';
import { DatabaseService } from '../service/database.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {
  @Input() conversations: Conversation[];

  @Output() keyToEmit = new EventEmitter();

  flag: boolean = true;
  constructor(
    private db: DatabaseService,
    private auth: AuthentificationService
  ) {}

  ngOnInit(): void {}

  sendKeyToParent(key: string) {
    this.keyToEmit.emit(key);
  }


  
}
