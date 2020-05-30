import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UtilServiceService } from '../util-service.service';
import { map } from 'rxjs/operators';
declare var swal: any;

@Component({
  selector: 'app-admin-subscription',
  templateUrl: './admin-subscription.component.html',
  styleUrls: ['./admin-subscription.component.scss']
})
export class AdminSubscriptionComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection;
  items: any;
  constructor(private afs: AngularFirestore, private util: UtilServiceService) {
    this.itemsCollection = afs.collection(`subscription`);
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
  }

  ngOnInit() {
  }
  delete(key) {
    const that = this;

    swal({
      title: 'Are you sure?',
      text: 'You want tack this acton???',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn-danger',
      confirmButtonText: 'Yes, i am sure!',
      cancelButtonText: 'No, cancel plc!',
      closeOnConfirm: true,
      closeOnCancel: true
    },
      function (isConfirm) {
        if (isConfirm) {

          const itemDoc = that.afs.doc(`subscription/${key}`);
          itemDoc.delete();
          that.util.notifyDanger('Record Is Deleted');
          return false;
        } else {
          return false;
        }
      });

  }
}
