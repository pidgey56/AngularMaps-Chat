import { Component, Input, OnInit } from '@angular/core';
import { message } from '../models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor() { }
  @Input() message : message;
  @Input() currentUser : any;

  ngOnInit(): void {
  }

}
