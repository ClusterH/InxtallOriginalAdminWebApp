import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UtilServiceService } from '../util-service.service';
import { map } from 'rxjs/operators';
declare var swal: any;

@Component({
  selector: 'app-admin-marchant',
  templateUrl: './admin-marchant.component.html',
  styleUrls: ['./admin-marchant.component.scss']
})
export class AdminMarchantComponent implements OnInit {
  @ViewChild('mydatatable') mydatatable: any;
  private itemsCollection: AngularFirestoreCollection;
  items: any;
  constructor(private afs: AngularFirestore, private util: UtilServiceService) {

    this.itemsCollection = afs.collection(`users`, ref => ref.where('role', '==', 1));
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
  }

  ngOnInit() {
  }
  changeStatus(key, type) {
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

          const itemDoc = that.afs.doc(`users/${key}`);
          if (type === 'block') {
            itemDoc.update({ 'adminStatus': 'Deactivate' });
            that.util.notifyPrimary('Marchant is Block');
          } else {
            itemDoc.update({ 'adminStatus': 'Active' });
            that.util.notifyPrimary('Marchant is UnBlock');

          }
          return false;
        } else {
          return false;
        }
      });

  }

}
