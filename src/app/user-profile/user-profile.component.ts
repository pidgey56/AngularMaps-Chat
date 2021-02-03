import { Component, Input, OnInit } from '@angular/core';
import * as firebase from "firebase";
import { User } from '../models/user.model';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() currentUser;
  @Input() user: User;
  constructor() { }

  ngOnInit(): void {
  }

}
