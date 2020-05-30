import { Component, OnInit } from '@angular/core';
import { UtilServiceService } from '../util-service.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {
  create: any = {};
  file: any;
  user: any;
  constructor(private util: UtilServiceService, private afs: AngularFirestore, private route: Router) {
    this.user = this.util.getCurruntUser();

  }

  ngOnInit() {
  }
  setImage(event) {
    this.file = event.target.files[0];
  }

  store() {
    this.util.loaderStart();

    const { task, ref } = this.util.uploadImageToFirebase(this.file);
    task.subscribe(
      snapshot => {
        // this.imageUploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      error => alert('Some error occured while uploading the picture'),
      () => ref.getDownloadURL().subscribe(downloadUrl => {

        this.create.image = downloadUrl;

        const category = this.afs.collection(`service`).doc(this.user.uid).collection('service');

        const itemDoc = this.afs.doc(`service/${this.user.uid}`);

        const id = this.afs.createId();
        category.add(this.create).then(res => {
          this.util.notifyPrimary('Record Added');
          this.create = {};
          this.file = '';
          this.util.loaderStop();

          this.route.navigate(['/service']);
        }).catch(err => {

        });

      })
    );
  }
}
