import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UtilServiceService } from '../util-service.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-review',
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.scss']
})
export class AdminReviewComponent implements OnInit {
  @ViewChild('mydatatable') mydatatable: any;
  private itemsCollection: AngularFirestoreCollection;
  items: any;
  constructor(private afs: AngularFirestore, private util: UtilServiceService) {
    this.itemsCollection = afs.collection(`ratingMaster`);
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })), map(res => res.map((r: any) => {
        if (r.userId) {
          r.maechant = this.afs.doc(`users/${r.marchantId}`).valueChanges();
          r.user = this.afs.doc(`users/${r.userId}`).valueChanges();
        }
        return r;
      })));
  }

  ngOnInit() {
  }

}
