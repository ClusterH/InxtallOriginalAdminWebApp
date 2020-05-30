import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';

// import 'rxjs/add/operator/take';
// import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { UtilServiceService } from './util-service.service';

@Injectable()
export class MessagingService {
  private userUid: any;
  messaging = firebase.messaging();
  // currentMessage = new BehaviorSubject(null);

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private util: UtilServiceService) {
    // this.userUid = this.afAuth.auth.currentUser;
    this.userUid = this.util.getCurruntUser();
    // console.log('this.afAuth.auth.currentUser', this.afAuth.auth.currentUser);
  }

  updateToken(token) {
    // setTimeout(() => {

    //   console.log('userUid', this.userUid);
    // }, 5000);

    this.afAuth.authState.subscribe(user => {
      if (!user) {
        return false;
      }
      console.log('user', user.uid);
      this.afs.doc(`users/${user.uid}`).update({
        token: token
      }).then(res => {
        return true;
      });
    });

  }
  getPermission() {
    this.messaging.requestPermission()
      .then((res) => {
        console.log('res', res);

        console.log('Notification permission granted.');
        this.messaging.getToken().then(token => {
          console.log('i am token', token);
          this.updateToken(token);
        });

        return this.messaging.getToken();
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  // receiveMessage() {
  //   this.messaging.onMessage((payload) => {
  //     console.log('Message received. ', payload);
  //     this.currentMessage.next(payload);
  //   });

  // }
}
