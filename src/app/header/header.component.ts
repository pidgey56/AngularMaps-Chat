import { Component, Input, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthentificationService } from '../service/authentification.service';
import { DatabaseService } from '../service/database.service';
import { SnackbarService } from '../service/snackbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() isAuth: boolean;
  constructor(
    private authService: AuthentificationService,
    private snackService: SnackbarService
  ) {}

  ngOnInit() {}

  signOut() {
    this.authService.signOutUser();
    this.snackService.openSnackBar('Disconnected');
  }
}
