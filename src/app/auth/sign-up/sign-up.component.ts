import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { KeyService } from 'src/app/key.service';
import { chat } from 'src/app/models/chat.model';
import { Conversation } from 'src/app/models/conversation.model';
import { message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { DatabaseService } from 'src/app/service/database.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthentificationService,
    private snackService: SnackbarService,
    private router: Router,
    private dbService: DatabaseService,
    private keyService: KeyService
  ) {}
  submitted = false;
  registerForm: FormGroup;
  errorMessage: string;
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      pseudo: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.authService
      .createNewUser(
        this.registerForm.value.email,
        this.registerForm.value.password
      )
      .then(
        () => {
          this.snackService.openSnackBar('Inscription success');
          let newConversation: Conversation = {
            uidParticipants: [this.authService.currentUser().uid],
            keyConversation: this.keyService.generateKey('self'),
            nomDeConversation: this.registerForm.value.pseudo,
          };
          let user: User = {
            username: this.registerForm.value.pseudo,
            conversations: [newConversation],
            uid: firebase.default.auth().currentUser.uid,
            email: this.registerForm.value.email,
          };
          this.dbService.save('/user/' + user.uid, user);
          this.router.navigate(['/']);
        },
        (error) => {
          this.errorMessage = error;
          this.snackService.openSnackBar(this.errorMessage);
        }
      );
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
