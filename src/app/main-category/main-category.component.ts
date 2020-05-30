import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Category } from '../category';
import { UtilServiceService } from '../util-service.service';
import { map } from 'rxjs/operators';
declare var jQuery: any;
declare var swal: any;

@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.scss']
})
export class MainCategoryComponent implements OnInit {
  private category: AngularFirestoreCollection<Category>;
  @ViewChild('mydatatable') mydatatable: any;
  private itemsCollection: AngularFirestoreCollection;
  items: any;
  user: any;
  edit: any = {};
  editkey: any;
  file: any;

  constructor(private afs: AngularFirestore, private util: UtilServiceService) {
    this.itemsCollection = afs.collection(`category`);
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
  }

  ngOnInit() {
  }
  modelOpen(key) {
    this.editkey = key;
    this.afs.doc(`category/${key}`).valueChanges().subscribe(res => {
      this.edit = res;
    });
    jQuery('#large-Modal').modal('toggle');

  }

  update() {
    const category = this.afs.doc(`category/${this.editkey}`);
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

          const itemDoc = that.afs.doc(`category/${key}`);
          itemDoc.delete();
          that.util.notifyDanger('Record Is Deleted');
          return false;
        } else {
          return false;
        }
      });

  }
}
