import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UtilServiceService } from '../util-service.service';
import { map } from 'rxjs/operators';
declare var jQuery: any;
declare var swal: any;

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  @ViewChild('mydatatable') mydatatable: any;
  private itemsCollection: AngularFirestoreCollection;
  items: any;
  user: any;
  edit: any = {};
  editkey: any;
  file: any;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: {};
  newService: any = [];
  dataWithKey: any = [];
  constructor(private afs: AngularFirestore, private util: UtilServiceService) {
    this.user = this.util.getCurruntUser();

    this.itemsCollection = afs.collection(`package/${this.user.uid}/package`);
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })), map(res => res.map((r: any) => {
        const temp: any = [];
        if (r.service) {
          r.service.forEach(s => {
            temp.push(this.afs.doc(`service/${this.user.uid}/service/${s}`).valueChanges());
          });
          r.serviceName = temp;

        }
        return r;
      })));
  }

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Service',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      primaryKey: 'id',
      labelKey: 'name',
      classes: 'myclass custom-class-example',
    };
  }
  modelOpen(key) {
    this.editkey = key;
    this.afs.doc(`package/${this.user.uid}/package/${key}`).valueChanges().subscribe(res => {
      this.edit = res;
    });

    this.itemsCollection = this.afs.collection(`service/${this.user.uid}/service`);
    this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))).subscribe(res => this.newService = res);
    this.selectedItems = [];
    this.dropdownList = [];
    this.dataWithKey = [];
    setTimeout(() => {
      this.newService.forEach((element: any) => {
        let temp = false;

        this.edit.service.forEach(ele => {
          if (element.id === ele) {
            temp = true;

          }
        });
        if (temp) {

          this.selectedItems.push(element);
        }

        this.dropdownList.push(element);

        temp = false;
      });
    }, 2000);

    jQuery('#large-Modal').modal('toggle');
  }
  setImage(event) {
    this.file = event.target.files[0];
  }
  update() {
    this.util.loaderStart();

    this.selectedItems.forEach(element => {
      this.dataWithKey.push(element.id);
    });
    if (this.file) {
      const { task, ref } = this.util.uploadImageToFirebase(this.file);
      task.subscribe(
        snapshot => {
          // this.imageUploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => alert('Some error occured while uploading the picture'),
        () => ref.getDownloadURL().subscribe(downloadUrl => {

          this.edit.image = downloadUrl;

          const category = this.afs.collection(`package`).doc(this.user.uid).collection('package').doc(this.editkey);

          // const itemDoc = this.afs.doc(`service/${this.user.uid}`);
          this.edit.service = this.dataWithKey;

          category.set(this.edit).then(res => {
            this.util.notifyPrimary('Record Updated');
            this.edit = {};
            this.file = '';
            this.selectedItems = [];
            this.dropdownList = [];
            this.dataWithKey = [];

            jQuery('#large-Modal').modal('toggle');
            this.util.loaderStop();

          }).catch(err => {
            this.util.loaderStop();

          });

        })
      );
    } else {
      const category = this.afs.collection(`package`).doc(this.user.uid).collection('package').doc(this.editkey);

      this.edit.service = this.dataWithKey;
      category.set(this.edit).then(res => {
        this.util.notifyPrimary('Record Updated');
        this.edit = {};
        this.file = '';
        this.selectedItems = [];
        this.dropdownList = [];
        this.dataWithKey = [];

        jQuery('#large-Modal').modal('toggle');
        this.util.loaderStop();

      }).catch(ree => {
        this.util.loaderStop();
      });
    }

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

          const itemDoc = that.afs.doc(`package/${that.user.uid}/package/${key}`);
          itemDoc.delete();
          that.util.notifyDanger('Record Is Deleted');
          return false;
        } else {
          return false;
        }
      });

  }
}
