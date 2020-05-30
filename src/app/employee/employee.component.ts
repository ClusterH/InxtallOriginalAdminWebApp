import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UtilServiceService } from '../util-service.service';
import { map } from 'rxjs/operators';
declare var swal: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection;

  items: any;
  user: any;
  edit: any = {};
  editkey: any;
  file: any;

  constructor(private afs: AngularFirestore, private util: UtilServiceService) {
    this.user = this.util.getCurruntUser();

    this.itemsCollection = afs.collection(`users/`, ref => ref.where('marchantId', '==', this.user.uid));
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

    const itemDoc = this.afs.doc(`users/${key}`);
    // const itemDoc2 = this.afs.doc(`employee/${this.user.uid}/employee/${key}`);
    if (type === 'block') {
      itemDoc.update({ 'status': 'Deactivate' });
      // itemDoc2.update({ 'status': 'Deactivate' });
      this.util.notifyPrimary('User is Block');
    } else {
      itemDoc.update({ 'status': 'Active' });
      // itemDoc2.update({ 'status': 'Active' });
      this.util.notifyPrimary('User is UnBlock');

    }
  }
  delete(key) {
    // const itemDoc = this.afs.doc(`employee/${this.user.uid}/employee/${key}`);
    // itemDoc.delete();
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
          const itemDoc2 = that.afs.doc(`users/${key}`);
          itemDoc2.delete();

          that.util.notifyDanger('Record Is Deleted');
          return false;
        } else {
          return false;
        }
      });

  }
}
