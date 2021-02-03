import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import * as firebase from 'firebase';
import { StorageService } from 'src/app/service/storage.service';
import { DatabaseService } from 'src/app/service/database.service';
@Component({
  selector: 'app-profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.scss'],
})
export class ProfilPageComponent implements OnInit {
  currentUser: User;
  fileToUpload: File;

  constructor(
    private storage: StorageService,
    private database: DatabaseService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    var ref = firebase.default
      .database()
      .ref('user/' + firebase.default.auth().currentUser.uid);
    ref.on('value', (data) => {
      if (data.val != null) {
        this.currentUser = data.val();
      }
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  save(){
    console.log("we want to save the file : ")
    console.log(this.fileToUpload);
    this.storage.uploadFile(this.fileToUpload).then((url: string) => {
      this.currentUser.profilePicture = url;
      console.log(this.currentUser);
      this.database.update('user/' + firebase.default.auth().currentUser.uid, this.currentUser);
    })
  }

}
