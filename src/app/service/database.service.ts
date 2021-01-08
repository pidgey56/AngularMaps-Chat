import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor() {}

  save(source: string, data) {
    firebase.default.database().ref(source).set(data);
  }

  update(source: string, data) {
    firebase.default.database().ref(source).update(data);
  }

  get(source: string) {
    return new Promise(() => {
      firebase.default
        .database()
        .ref(source)
        .on('value', (data) => {
          if (data.val != null) {
            return data.val();
          } else {
            console.log("too bad there's nothing here");
          }
        });
    });
  }
}
