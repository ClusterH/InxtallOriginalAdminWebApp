import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { UtilServiceService } from '../util-service.service';
declare var jQuery: any;
declare var swal: any;

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  @ViewChild('mydatatable') mydatatable: any;
  private itemsCollection: AngularFirestoreCollection;
  items: any;
  user: any;
  edit: any = {};
  editkey: any;
  file: any;
  constructor(private afs: AngularFirestore, private util: UtilServiceService) {
    this.user = this.util.getCurruntUser();

    this.itemsCollection = afs.collection(`service/${this.user.uid}/service`);
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
    // setTime
  }

  ngOnInit() {
  }
  setImage(event) {
    this.file = event.target.files[0];
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

          const itemDoc = that.afs.doc(`service/${that.user.uid}/service/${key}`);
          itemDoc.delete();
          that.util.notifyDanger('Record Is Deleted');
          return false;
        } else {
          return false;
        }
      });

  }

  modelOpen(key) {
    this.editkey = key;
    this.afs.doc(`service/${this.user.uid}/service/${key}`).valueChanges().subscribe(res => {
      this.edit = res;
    });
    jQuery('#large-Modal').modal('toggle');

  }
  update() {
    this.util.loaderStart();

    if (this.file) {
      const { task, ref } = this.util.uploadImageToFirebase(this.file);
      task.subscribe(
        snapshot => {
          // this.imageUploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => alert('Some error occured while uploading the picture'),
        () => ref.getDownloadURL().subscribe(downloadUrl => {

          this.edit.image = downloadUrl;

          const category = this.afs.collection(`service`).doc(this.user.uid).collection('service').doc(this.editkey);

          // const itemDoc = this.afs.doc(`service/${this.user.uid}`);

          const id = this.afs.createId();
          category.set(this.edit).then(res => {
            this.util.notifyPrimary('Record Updated');
            this.edit = {};
            this.file = '';
            this.util.loaderStop();

            jQuery('#large-Modal').modal('toggle');
          }).catch(err => {

            this.util.loaderStop();
          });

        })
      );
    } else {
      const category = this.afs.collection(`service`).doc(this.user.uid).collection('service').doc(this.editkey);

      category.set(this.edit).then(res => {
        this.util.notifyPrimary('Record Updated');
        this.edit = {};
        this.file = '';
        jQuery('#large-Modal').modal('toggle');
        this.util.loaderStop();
      }).catch(err => {

        this.util.loaderStop();
      });
    }

  }
}
