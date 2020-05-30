import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UtilServiceService } from '../util-service.service';
import { AngularFirestore } from '@angular/fire/firestore';
declare var jQuery;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  create: any = {};
  role: any = '';
  paypalSendBox: any = '';
  user: any;
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private util: UtilServiceService) {

    this.role = localStorage.getItem('fragile');
    const paypal = this.afs.doc(`mainAdminConfiguration/IJ2gZiWf46mGgBS80nF9`).valueChanges().subscribe((res: any) => {
      this.paypalSendBox = res.paypal_sendbox_id;
    });
    setTimeout(() => {
      this.user = this.util.getCurruntUser();

      const itemDoc = this.afs.doc(`users/${this.user.uid}`).valueChanges().subscribe((res: any) => {
        this.create = res;
      });
    }, 5000);

  }

  ngOnInit() {
  }
  logout() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('fragile');
    window.location.reload();
  }
  updatedata() {
    this.util.loaderStart();
    const user = this.user;
    user.updatePassword(this.create.password).then(() => {
      this.util.notifyPrimary('All things are new now');
      const itemDoc = this.afs.doc(`users/${this.user.uid}`);
      itemDoc.update(this.create);
      const paypal = this.afs.doc(`mainAdminConfiguration/IJ2gZiWf46mGgBS80nF9`);
      paypal.update({
        paypal_sendbox_id: this.paypalSendBox
      });
      this.util.loaderStop();
      jQuery('#mainAdmin').modal('toggle');

    }).catch((error) => {
      this.util.loaderStop();
      jQuery('#mainAdmin').modal('toggle');

      this.util.notifyDanger(error.message);
    });
  }

}
