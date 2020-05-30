import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UtilServiceService } from '../util-service.service';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

declare var jQuery: any;
@Component({
  selector: 'app-marchant-booking-view',
  templateUrl: './marchant-booking-view.component.html',
  styleUrls: ['./marchant-booking-view.component.scss']
})
export class MarchantBookingViewComponent implements OnInit, OnDestroy {

  private itemsCollection: AngularFirestoreDocument;
  items: any;
  user: any;
  data: any;
  key: string;
  lat: any;

  lag: any;
  address: any;

  constructor(private afs: AngularFirestore, private util: UtilServiceService, private route: Router) {
    this.user = this.util.getCurruntUser();
    this.key = this.util.bookingKey;
    // tslint:disable-next-line:max-line-length
    console.log(this.key);

    if (this.key) {
      this.itemsCollection = afs.doc(`bookingMaster/${this.key}`);
      this.items = this.itemsCollection.valueChanges().pipe(
        map((r: any) => {
          const temp: any = [];
          r.subTotal = r.total + r.discount;
          if (r.services) {
            r.services.forEach(s => {
              temp.push(this.afs.doc(`service/${this.user.uid}/service/${s}`).valueChanges());
            });
            r.serviceName = temp;

          }
          if (r.AvailableEmpId) {
            r.availableEmp = this.afs.doc(`users/${r.AvailableEmpId}`).valueChanges();
          }
          if (r.userId) {
            r.user = this.afs.doc(`users/${r.userId}`).valueChanges();
            r.userCar = this.afs.doc(`carMaster/${r.carId}`).valueChanges();
          }
          if (r.address && r.UserWant === 'STAY') {
            r.userAddress = this.afs.doc(`addressMaster/${r.address}`).valueChanges();

            this.afs.doc(`addressMaster/${r.address}`).valueChanges().subscribe((der: any) => {
              this.address = der.Address;
              // tslint:disable-next-line:max-line-length
              const newLatLong = this.util.httpGetReq('https://maps.googleapis.com/maps/api/geocode/json?address=' + der.Address + '&key=AIzaSyCnonY4_vKacxJl7Mlyl7KJ_oxLF1o8SQk');
              newLatLong.subscribe((address: any) => {
                console.log('address', address.results[0].geometry.location.lat);
                this.lat = address.results[0].geometry.location.lat;
                this.lag = address.results[0].geometry.location.lng;
              }, err => console.log('MapError', err));

            });
          }
          return r;
        })).subscribe(res => this.data = res);
      console.log('lat', this.lat);
      console.log('lag', this.lag);
      // items.subscribe(res => console.log('res', res));
    } else {
      this.route.navigate(['/marchant/booking']);
    }
  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.util.bookingKey = null;
  }
}
