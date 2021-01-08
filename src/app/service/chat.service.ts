import { Injectable } from '@angular/core';
import { KeyService } from '../key.service';
import { Conversation } from '../models/conversation.model';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private keyService: KeyService) {}
}
