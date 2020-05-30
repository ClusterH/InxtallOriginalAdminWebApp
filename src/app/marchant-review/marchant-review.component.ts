import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UtilServiceService } from '../util-service.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-marchant-review',
  templateUrl: './marchant-review.component.html',
  styleUrls: ['./marchant-review.component.scss']
})
export class MarchantReviewComponent implements OnInit {
  @ViewChild('mydatatable') mydatatable: any;
  private itemsCollection: AngularFirestoreCollection;
  items: any;
  user: any;
  constructor(private afs: AngularFirestore, private util: UtilServiceService) {
    this.user = this.util.getCurruntUser();
    this.itemsCollection = afs.collection(`ratingMaster`, ref => ref.where('marchantId', '==', this.user.uid));
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })), map(res => res.map((r: any) => {
        if (r.userId) {
          r.emp = this.afs.doc(`users/${r.employeeId}`).valueChanges();
          r.user = this.afs.doc(`users/${r.userId}`).valueChanges();
        }
        return r;
      })));
  }

  ngOnInit() {
  }

}
