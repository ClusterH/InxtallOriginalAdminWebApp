import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UtilServiceService } from '../util-service.service';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';
declare var jQuery: any;
declare var swal: any;
@Component({
  selector: 'app-marchant-booking',
  templateUrl: './marchant-booking.component.html',
  styleUrls: ['./marchant-booking.component.scss']
})
export class MarchantBookingComponent implements OnInit {
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

    this.itemsCollection = afs.collection(`users/`, ref => ref.where('marchantId', '==', this.user.uid));
    this.util.loaderStart();

    this.emp$ = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })));

    // tslint:disable-next-line:max-line-length
    this.itemsCollection = afs.collection(`bookingMaster`, ref => ref.where('marchantId', '==', this.user.uid).where('adminStatus', '==', 0));
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
    this.util.loaderStop();

  }
  ngOnInit() {
  }
  assignModelOpen(key, emp) {

    this.editkey = key;
    this.assignEmpKey = emp;
    jQuery('#assignEmp').modal('toggle');
  }
  assignEmp() {
    this.util.loaderStart();

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

          const itemDoc = that.afs.doc(`bookingMaster/${that.editkey}`);
          itemDoc.update({ 'status': 1, AvailableEmpId: that.assignEmpKey });
          const noti = that.afs.collection(`notification`);
          noti.add({
            'id': that.assignEmpKey,
            'bookingKey': that.editkey,
            'type': 3
          });
          noti.add({
            'id': that.assignEmpKey,
            'bookingKey': that.editkey,
            'type': 2
          });
          setTimeout(() => {
            that.util.notifyPrimary('Changes Are is Done...');
            jQuery('#assignEmp').modal('toggle');
          }, 3000);
          this.util.loaderStop();

          return false;
        } else {
          this.util.loaderStop();
          return false;
        }
      });

  }

  cancelBooking(key, userKey, empkey) {
    this.util.loaderStart();

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

          const itemDoc = that.afs.doc(`bookingMaster/${key}`);
          itemDoc.update({ 'status': 3, adminStatus: 1 });
          const noti = that.afs.collection(`notification`);
          noti.add({
            'id': userKey,
            'bookingKey': key,
            'type': 2
          });
          if (empkey) {
            noti.add({
              'id': empkey,
              'bookingKey': key,
              'type': 4
            });
          }
          that.util.loaderStop();

          return false;
        } else {
          that.util.loaderStop();
          return false;
        }
      });

  }

  ViewFullBooking(key) {
    this.util.bookingKey = key;

    this.route.navigate(['/marchant/booking/single']);
  }
}
