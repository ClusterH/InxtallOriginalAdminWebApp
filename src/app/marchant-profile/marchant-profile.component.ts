import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UtilServiceService } from '../util-service.service';
import { map } from 'rxjs/operators';
import { MarchantData } from '../marchant-data';

declare var jQuery: any;

@Component({
  selector: 'app-marchant-profile',
  templateUrl: './marchant-profile.component.html',
  styleUrls: ['./marchant-profile.component.scss']
})
export class MarchantProfileComponent implements OnInit {
  create: MarchantData = {
    token: '',
    role: null,
    name: '',
    email: '',
    description: '',
    password: '',
    noOfEmp: 0,
    noOfService: 0,
    radius: 5,
    status: 'Active',
    shopName: '',
    username: '',
    coverImage: '',
    lat: 0,
    lng: 0,
    profileImage: '',
    time: [{
      'end': '21:00',
      'start': '09:00'
    }, {
      'end': '20:00',
      'start': '10:00'
    }, {
      'end': '20:00',
      'start': '10:00'
    }, {
      'end': '20:00',
      'start': '10:00'
    }, {
      'end': '20:00',
      'start': '10:00'
    }, {
      'end': '21:00',
      'start': '09:00'
    }, {
      'end': '21:00',
      'start': '09:00'
    }],
    remainWash: null,
    remainDays: null,
    address: '',
    phone: '',
    service: '',
    purchaseStatus: '',
    adminStatus: '',
    PayPalEnvironmentProduction: '',
    PayPalEnvironmentSandbox: '',
  };
  user: any;
  private itemsCollection: AngularFirestoreCollection;
  file: any;
  editkey: any;
  lat = 51.678418;
  lng = 7.809007;
  edit: any;
  items: any;
  updateData: any;
  address: string;
  constructor(private afs: AngularFirestore, private util: UtilServiceService) {
    this.user = this.util.getCurruntUser();
    this.getData();

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
  setImage(event, type) {
    this.util.loaderStart();

    if (type === 'cover') {

      const { task, ref } = this.util.uploadImageToFirebase(event.target.files[0]);
      task.subscribe(
        snapshot => {
          // this.imageUploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => alert('Some error occured while uploading the picture'),
        () => ref.getDownloadURL().subscribe(downloadUrl => {

          const itemDoc = this.afs.doc(`users/${this.user.uid}`);
          itemDoc.update({ 'coverImage': downloadUrl });
          this.util.loaderStop();

        }));
    } else {
      const { task, ref } = this.util.uploadImageToFirebase(event.target.files[0]);
      task.subscribe(
        snapshot => {
          // this.imageUploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => alert('Some error occured while uploading the picture'),
        () => ref.getDownloadURL().subscribe(downloadUrl => {

          const itemDoc = this.afs.doc(`users/${this.user.uid}`);
          itemDoc.update({ 'profileImage': downloadUrl });
          this.util.loaderStop();

        }));
    }
  }
  getData() {

    this.updateData = this.afs.doc<MarchantData>(`users/${this.user.uid}`).valueChanges().subscribe(res => {
      this.create = res;
      this.create.lat = this.create.lat ? this.create.lat : this.lat;
      this.create.lng = this.create.lng ? this.create.lng : this.lng;
      this.create.radius = this.create.radius ? this.create.radius : 5;
    });
  }
  setData1() {
    const itemDoc = this.afs.doc(`users/${this.user.uid}`);
    itemDoc.update(this.create);
    this.util.notifyPrimary('Record Is Updated');
  }
  der() {

    // tslint:disable-next-line:max-line-length
    const newLatLong = this.util.httpGetReq('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.address + '&key=AIzaSyCnonY4_vKacxJl7Mlyl7KJ_oxLF1o8SQk');
    newLatLong.subscribe((res: any) => {

      this.create.lat = res.results[0].geometry.location.lat;
      this.create.lng = res.results[0].geometry.location.lng;
    });

  }
  placeMarker($event) {
    this.create.lat = $event.coords.lat;
    this.create.lng = $event.coords.lng;
  }

  updateLocation() {
    const itemDoc = this.afs.doc(`users/${this.user.uid}`);
    itemDoc.update({ 'lat': this.create.lat, 'lng': this.create.lng, 'radius': this.create.radius });
    this.util.notifyPrimary('Location is updated');
  }
  setData() {
    const user = this.user;
    user.updatePassword(this.create.password).then(() => {
      this.util.notifyPrimary('All things are new now');
      const itemDoc = this.afs.doc(`users/${this.user.uid}`);
      itemDoc.update(this.create);
    }).catch((error) => {
      this.util.notifyDanger(error.message);
    });
  }
  setPaypal() {
    const itemDoc = this.afs.doc(`users/${this.user.uid}`);
    // tslint:disable-next-line:max-line-length
    itemDoc.update({ 'PayPalEnvironmentSandbox': this.create.PayPalEnvironmentSandbox, 'PayPalEnvironmentProduction': this.create.PayPalEnvironmentProduction });
    this.util.notifyPrimary('All things are new now');

  }
}
