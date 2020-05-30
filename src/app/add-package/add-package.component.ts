import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UtilServiceService } from '../util-service.service';
import { map } from 'rxjs/operators';
import { log } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent implements OnInit {
  dataWithKey: any = [];
  dropdownSettings = {};
  dropdownList = [];
  selectedItems = [];
  create: any = {};
  private itemsCollection: AngularFirestoreCollection;
  items: any;
  user: any;
  file: any;
  constructor(private afs: AngularFirestore, private util: UtilServiceService, private route: Router) {
    this.user = this.util.getCurruntUser();

    this.itemsCollection = afs.collection(`service/${this.user.uid}/service`);
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))).subscribe(res => this.dropdownList = res);

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
  onItemSelect(item: any) {

  }
  OnItemDeSelect(item: any) {

  }
  onSelectAll(items: any) {

  }
  onDeSelectAll(items: any) {

  }

  setImage(event) {
    this.file = event.target.files[0];
  }

  store() {
    this.util.loaderStart();

    this.selectedItems.forEach(element => {
      this.dataWithKey.push(element.id);
    });

    const { task, ref } = this.util.uploadImageToFirebase(this.file);
    task.subscribe(
      snapshot => {
        // this.imageUploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      error => alert('Some error occured while uploading the picture'),
      () => ref.getDownloadURL().subscribe(downloadUrl => {

        this.create.image = downloadUrl;
        this.create.service = this.dataWithKey;
        const category = this.afs.collection(`package`).doc(this.user.uid).collection('package');

        //  const itemDoc = this.afs.doc(`package/${this.user.uid}`);

        const id = this.afs.createId();
        category.add(this.create).then(res => {
          this.util.notifyPrimary('Record Added');
          this.create = {};
          this.file = ' ';
          this.util.loaderStop();

          this.route.navigate(['/package']);
        }).catch(err => {

        });

      })
    );
  }
}
