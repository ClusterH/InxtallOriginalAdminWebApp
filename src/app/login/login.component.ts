import { Component, OnInit } from '@angular/core';
import { UtilServiceService } from '../util-service.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: any;
  password: any;

  constructor(private util: UtilServiceService, private afs: AngularFirestore) { }

  ngOnInit() {
  }
  login() {

    this.util.login(this.email, this.password).then(res => {
      // this.util.displaySingleData('user', res.user.uid).subscribe(user => {
      let itemDoc: any;
      this.afs.doc(`users/${res.user.uid}`).valueChanges().subscribe(res12 => {

        itemDoc = res12;
        if (itemDoc.role === 0) {
          localStorage.setItem('fragile', '1011');
          this.util.notifyPrimary('User Login Success');
          window.location.reload();
        }
        if (itemDoc.adminStatus === 'Active' && itemDoc.role !== 0) {
          if (itemDoc.purchaseStatus === 'Active') {
            itemDoc.uid = res.user.uid;
            if (itemDoc.role === 0) {
              // main admin === 1011
              localStorage.setItem('fragile', '1011');
              this.util.notifyPrimary('User Login Success');

            } else if (itemDoc.role === 1) {
              localStorage.setItem('fragile', '1997');
              this.util.notifyPrimary('User Login Success');

            } else {
              this.util.notifyPrimary('You Loss Your Mind... ');
            }
            // this.util.isLoginSubject.next(true);
            window.location.reload();
          } else {
            this.util.notifyDanger('Oops!!! Your Plan Is End Please Subscribe First...');
            localStorage.setItem('fragile', '404');
            window.location.reload();

          }
        } else {
          this.util.notifyDanger('Oops!!! You Are Block By Someone Bigger Man...');
        }


      }, err => {

      });

    }).catch(err => {

      this.util.notifyDanger(err.message);
    });
  }
}
