import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  user: Observable<firebase.default.User>;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  createNewUser(email: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      firebase.default
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  signInUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase.default
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  signOutUser() {
    firebase.default.auth().signOut();
  }

  currentUser() {
    return firebase.default.auth().currentUser;
  }

  isAuth(): boolean {
    firebase.default.auth().onAuthStateChanged((user) => {
      if (user) {
        return true;
      } else {
        return false;
      }
    });
    return false;
  }
}
