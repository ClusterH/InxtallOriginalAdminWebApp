import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Category } from '../category';
import { UtilServiceService } from '../util-service.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-purchase-subscription',
  templateUrl: './purchase-subscription.component.html',
  styleUrls: ['./purchase-subscription.component.scss']
})
export class PurchaseSubscriptionComponent implements OnInit {
  private category: AngularFirestoreCollection<Category>;
  items: any;

  @ViewChild('mydatatable') mydatatable: any;
  private itemsCollection: AngularFirestoreCollection;
  constructor(private afs: AngularFirestore, private util: UtilServiceService) {
    this.itemsCollection = afs.collection(`subscriptionBookingData`);
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })), map(res => res.map((r: any) => {
        r.planData = this.afs.doc(`subscription/${r.plan}`).valueChanges();
        r.marchantData = this.afs.doc(`users/${r.marchant_id}`).valueChanges();
        return r;

      })));
  }

  ngOnInit() {
  }

}
