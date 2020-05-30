import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UtilServiceService } from '../util-service.service';
import { map } from 'rxjs/operators';
declare var jQuery: any;
declare var swal: any;
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  @ViewChild('mydatatable') mydatatable: any;
  private itemsCollection: AngularFirestoreCollection;
  items: any;
  user: any;
  edit: any = {};
  editkey: any;
  file: any;

  constructor(private afs: AngularFirestore, private util: UtilServiceService) {
    this.itemsCollection = afs.collection(`faq`);
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
  }
  modelOpen(key) {
    this.editkey = key;
    this.afs.doc(`faq/${key}`).valueChanges().subscribe(res => {
      this.edit = res;
    });
    jQuery('#large-Modal').modal('toggle');

  }
  ngOnInit() {
  }
  update() {
    const category = this.afs.doc(`faq/${this.editkey}`);
    category.set(this.edit).then(res => {
      this.util.notifyPrimary('Record Updated');
      this.edit = {};
      this.file = '';
      jQuery('#large-Modal').modal('toggle');
    });
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

          const itemDoc = that.afs.doc(`faq/${key}`);
          itemDoc.delete();
          that.util.notifyDanger('Record Is Deleted');
          return false;
        } else {
          return false;
        }
      });

  }
}
