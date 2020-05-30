import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
declare var jQuery: any;
@Injectable({
  providedIn: 'root'
})
export class UtilServiceService {
  private _bookingKey: string;

  // tslint:disable-next-line:max-line-length
  constructor(private afAuth: AngularFireAuth, private afStorage: AngularFireStorage, private HTTP: HttpClient, private afs: AngularFirestore, private spinner: NgxSpinnerService) { }
  // tslint:disable-next-line:max-line-length
  public get bookingKey(): string {
    return this._bookingKey;
  }
  public set bookingKey(value: string) {
    this._bookingKey = value;
  }
  // tslint:disable-next-line:max-line-length
  notifyPrimary(msg, from = 'top', align = 'right', icon = '', type = 'primary', animIn = 'animated fadeInLeft', animOut = 'animated fadeOutLeft') {
    jQuery.growl({
      icon: icon,
      title: '',
      message: msg,
      url: ''
    }, {
        element: 'body',
        type: type,
        allow_dismiss: true,
        placement: {
          from: from,
          align: align
        },
        offset: {
          x: 30,
          y: 30
        },
        spacing: 10,
        z_index: 999999,
        delay: 2500,
        timer: 1000,
        url_target: '_blank',
        mouse_over: false,
        animate: {
          enter: animIn,
          exit: animOut
        },
        icon_type: 'class',
        template: '<div data-growl="container" class="alert" role="alert">' +
          '<button type="button" class="close" data-growl="dismiss">' +
          '<span aria-hidden="true">&times;</span>' +
          '<span class="sr-only">Close</span>' +
          '</button>' +
          '<span data-growl="icon"></span>' +
          '<span data-growl="title"></span>' +
          '<span data-growl="message"></span>' +
          '<a href="#" data-growl="url"></a>' +
          '</div>'
      });
  }
  getCurruntUser() {
    return this.afAuth.auth.currentUser;
  }
  register(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  // tslint:disable-next-line:max-line-length
  notifyDanger(msg, from = 'top', align = 'right', icon = '', type = 'danger', animIn = 'animated fadeInLeft', animOut = 'animated fadeOutLeft') {
    jQuery.growl({
      icon: icon,
      title: '',
      message: msg,
      url: ''
    }, {
        element: 'body',
        type: type,
        allow_dismiss: true,
        placement: {
          from: from,
          align: align
        },
        offset: {
          x: 30,
          y: 30
        },
        spacing: 10,
        z_index: 999999,
        delay: 2500,
        timer: 1000,
        url_target: '_blank',
        mouse_over: false,
        animate: {
          enter: animIn,
          exit: animOut
        },
        icon_type: 'class',
        template: '<div data-growl="container" class="alert" role="alert">' +
          '<button type="button" class="close" data-growl="dismiss">' +
          '<span aria-hidden="true">&times;</span>' +
          '<span class="sr-only">Close</span>' +
          '</button>' +
          '<span data-growl="icon"></span>' +
          '<span data-growl="title"></span>' +
          '<span data-growl="message"></span>' +
          '<a href="#" data-growl="url"></a>' +
          '</div>'
      });
  }

  uploadImageToFirebase(file) {
    const randomId = new Date().getTime() + Math.random().toString(36).substring(2);
    const ref = this.afStorage.ref(randomId);
    const task = ref.put(file);
    return {
      task: task.snapshotChanges(),
      ref,
      path: randomId
    };
  }

  httpGetReq(link) {

    return this.HTTP.get(link);

  }

  getmainAdminCongigration() {
    return this.afs.doc(`mainAdminConfiguration/IJ2gZiWf46mGgBS80nF9`).valueChanges();
    // return itemsCollection.snapshotChanges()
  }
  deleteFileFromStorage(downloadUrl) {
    return this.afStorage.storage.refFromURL(downloadUrl).delete();
  }
  loaderStop() {
    this.spinner.hide();

  }
  loaderStart() {
    this.spinner.show();

  }
}
