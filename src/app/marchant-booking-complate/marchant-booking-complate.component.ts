import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UtilServiceService } from '../util-service.service';
import { map } from 'rxjs/operators';
import { pipe } from '@angular/core/src/render3';
import { Router } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-marchant-booking-complate',
  templateUrl: './marchant-booking-complate.component.html',
  styleUrls: ['./marchant-booking-complate.component.scss']
})
export class MarchantBookingComplateComponent implements OnInit {

  private category: AngularFirestoreCollection;
  @ViewChild('mydatatable') mydatatable: any;
  private itemsCollection: AngularFirestoreCollection;
  private emp: AngularFirestoreCollection;
  emp$: any;
  editkey: any;
  items: any;
  assignEmpKey: string;
  user: any;
  constructor(private afs: AngularFirestore, private util: UtilServiceService, private route: Router) {
    this.user = this.util.getCurruntUser();

    // tslint:disable-next-line:max-line-length
    this.itemsCollection = afs.collection(`bookingMaster`, ref => ref.where('marchantId', '==', this.user.uid).where('adminStatus', '==', 1));
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })), map(res => res.map((r: any) => {
        const temp: any = [];
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
        if (r.address) {
          r.userAddress = this.afs.doc(`addressMaster/${r.address}`).valueChanges();

        }
        return r;
      })));
  }

  ngOnInit() {
  }
  ViewFullBooking(key) {
    this.util.bookingKey = key;

    this.route.navigate(['/marchant/booking/single']);
  }
}
