import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../service/authentification.service';
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
    private snackService: SnackbarService,
    private router : Router,
  ) {}

  ngOnInit() {}

  signOut() {
    this.authService.signOutUser();
    this.snackService.openSnackBar('Disconnected',5000);
    this.router.navigate(['']);
  }
}
