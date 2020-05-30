import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UtilServiceService } from '../util-service.service';
import { map } from 'rxjs/operators';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
declare var jQuery: any;
import * as moment from 'moment';
@Component({
  selector: 'app-buy-subscription',
  templateUrl: './buy-subscription.component.html',
  styleUrls: ['./buy-subscription.component.scss']
})
export class BuySubscriptionComponent implements OnInit {

  public payPalConfig?: PayPalConfig;
  private itemsCollection: AngularFirestoreCollection;
  items: any;
  user: any;
  remainDays: any;
  remainWash: any;
  userData: any;
  sandbox: string;
  mainConfig: any = {};

  constructor(private afs: AngularFirestore, private util: UtilServiceService) {
    this.user = this.util.getCurruntUser();
    this.itemsCollection = afs.collection(`subscription`);
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
    this.afs.doc(`users/${this.user.uid}`).valueChanges().subscribe((res: any) => {

      this.remainWash = res.remainWash;
      this.remainDays = res.remainDays;

    });
    this.util.getmainAdminCongigration().subscribe((res: any) => {
      this.mainConfig = res;


    });
  }

  ngOnInit() {
    // this.initConfig();

  }
  initConfig(price, title, key, newday, newwash): void {


    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: this.mainConfig.paypal_sendbox_id,
      },
      button: {
        label: 'paypal',
      },
      onPaymentComplete: (data, actions) => {

        const category = this.afs.collection(`subscriptionBookingData`);
        category.add({
          'marchant_id': this.user.uid,
          'payment_token': data.paymentToken,
          'plan': key,
          'time': moment().format('YYYY-MM-DD HH:mm:ss')
        });
        const marchant = this.afs.doc(`users/${this.user.uid}`);
        marchant.update({
          'remainWash': this.remainWash + newwash,
          'remainDays': this.remainDays + newday,
          'purchaseStatus': 'Active',
        });
      },
      onCancel: (data, actions) => {


      },
      onError: (err) => {

        alert('We facing some issue Right Now');

      },
      transactions: [{
        amount: {
          currency: 'USD',
          total: price
        }
      }]
    });
  }
  paymentModel(price, title, key, day, wash) {
    this.initConfig(price, title, key, day, wash);
    jQuery('#large-Modal').modal('toggle');
  }
}
