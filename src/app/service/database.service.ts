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

}
