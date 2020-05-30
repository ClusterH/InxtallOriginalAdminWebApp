import { Component, OnInit } from '@angular/core';
import { UtilServiceService } from '../util-service.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  create: any = {};
  file: any;
  user: any;
  email: any;
  password: any;
  itemsCollection: any;

  constructor(private util: UtilServiceService, private afs: AngularFirestore, private route: Router, private afAuth: AngularFireAuth) {
    this.itemsCollection = afs.collection('users');
    this.user = this.util.getCurruntUser();

    this.afs.doc(`users/${this.user.uid}`).valueChanges().subscribe((res: any) => {

      this.email = res.email;
      this.password = res.password;

    });

  }

  ngOnInit() {
  }
  setImage(event) {
    this.file = event.target.files[0];
  }
  store() {
    this.util.loaderStart();
    this.util.register(this.create.email, this.create.password).then((data) => {

      if (this.file) {
        const { task, ref } = this.util.uploadImageToFirebase(this.file);
        task.subscribe(
          snapshot => {
            // this.imageUploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          error => alert('Some error occured while uploading the picture'),
          () => ref.getDownloadURL().subscribe(downloadUrl => {

            this.create.image = downloadUrl;

            // const id = this.afs.createId();
            this.create.role = 2;
            this.create.marchantId = this.user.uid;

            this.itemsCollection.doc(data.user.uid).set(this.create);
            // that.util.updataWithNewData('user', data.user.uid, this.create).then(() => {
            // const category = this.afs.collection(`employee`).doc(this.user.uid).collection('employee');

            // const itemDoc = this.afs.doc(`employee/${this.user.uid}`);

            // category.doc(data.user.uid).set(this.create).then(res => {
            this.util.notifyPrimary('Employee Added');
            this.create = {};
            this.file = '';
            this.util.login(this.email, this.password).then(login => {
              this.util.loaderStop();
              this.route.navigate(['/employee']);
              // });
            }).catch(err => {

            });

          })
        );
      } else {
        this.create.image = 'https://dumielauxepices.net/sites/default/files/person-icons-avatar-711972-5314933.png';

        // const id = this.afs.createId();
        this.create.role = 2;
        this.create.marchantId = this.user.uid;

        this.itemsCollection.doc(data.user.uid).set(this.create);
        // that.util.updataWithNewData('user', data.user.uid, this.create).then(() => {
        // const category = this.afs.collection(`employee`).doc(this.user.uid).collection('employee');

        // const itemDoc = this.afs.doc(`employee/${this.user.uid}`);
        // category.doc(data.user.uid).set(this.create).then(res => {
        this.util.notifyPrimary('Employee Added');
        this.create = {};
        this.file = '';
        this.util.login(this.email, this.password).then(login => {
          this.util.loaderStop();

          this.route.navigate(['/employee']);
          // });
        }).catch(err => {

        });
      }

    }, (err) => {

      this.util.notifyDanger(err.message);

    });

  }
}
