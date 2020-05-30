import { Component, OnInit } from '@angular/core';
import { UtilServiceService } from '../util-service.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marchant-dashboard',
  templateUrl: './marchant-dashboard.component.html',
  styleUrls: ['./marchant-dashboard.component.scss']
})
export class MarchantDashboardComponent implements OnInit {
  user: any;
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  liveMonth: string;
  totalService: number;
  totalEmp: number;
  today: number;
  grandTotal: number;
  grandBooking: number;
  grandCancelTotal: number;
  grandCancel: number;
  todayIncome: number;
  tomorrow: number;
  atShop: number;
  outsideShop: number;
  month: number;
  booking: any;
  public doughnutChartLabels: string[] = ['Done', 'Not Assign', 'Cancel', 'Assign'];
  public doughnutChartData: number[] = [0, 0, 0, 0];
  public doughnutChartType = 'doughnut';
  done = 0;
  notAssign = 0;
  cancel = 0;
  assign = 0;
  rDay = 0;
  rWash = 0;
  lDay: any;
  constructor(private afs: AngularFirestore, private util: UtilServiceService, private route: Router) {
    this.user = this.util.getCurruntUser();
    this.getData();
    this.liveMonth = this.monthNames[moment().month()];
    this.today = 0;
    this.grandTotal = 0;
    this.grandBooking = 0;
    this.grandCancelTotal = 0;
    this.grandCancel = 0;
    // this.todayIncome = 0;
    this.tomorrow = 0;
    this.atShop = 0;
    this.outsideShop = 0;
    this.month = 0;

    const bookinLatest = afs.collection(`bookingMaster`, ref => ref.where('marchantId', '==', this.user.uid).limit(5));
    this.booking = bookinLatest.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
  }

  ngOnInit() {
    this.afs.collection(`bookingMaster`, ref => ref.where('marchantId', '==', this.user.uid)).valueChanges().subscribe(element => {
      this.grandBooking = element.length;
      element.forEach((res: any) => {

        if (res.status === 2) {
          this.grandTotal += res.total;
          this.done += 1;
        } else if (res.status === 3) {
          this.grandCancelTotal = res.total;
          this.grandCancel += 1;
        } else if (res.status === 1) {
          this.assign += 1;
        } else {
          this.notAssign += 1;
        }
        if (res.UserWant === 'COME') {
          this.atShop += res.total;
        } else {
          this.outsideShop += res.total;
        }
        // tslint:disable-next-line:max-line-length
        if (moment(moment().format('YYYY-MM-DD')).isSame(moment(res.startTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'), 'day')) {
          this.today += 1;
          // this.todayIncome += res.total;

        }
        const tomorrow = moment().add(1, 'days');
        // tslint:disable-next-line:max-line-length
        if (moment(moment(tomorrow).format('YYYY-MM-DD')).isSame(moment(res.startTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'), 'day')) {
          this.tomorrow += 1;

        }
        if (moment(moment().format('YYYY-MM-DD')).isSame(moment(res.startTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'), 'month')) {
          this.month += 1;
        }
        return res;
      });
      const data = [
        this.done,
        this.notAssign,
        this.grandCancel,
        this.assign];

      this.doughnutChartData = data;

    });

    this.afs.collection(`service/${this.user.uid}/service`).valueChanges().subscribe(res => {
      this.totalService = res.length;
    });
    // tslint:disable-next-line:max-line-length
    this.afs.collection(`users/`, ref => ref.where('marchantId', '==', this.user.uid).where('role', '==', 2)).valueChanges().subscribe(res => {
      this.totalEmp = res.length;

    });

  }

  getData() {

    this.afs.doc(`users/${this.user.uid}`).valueChanges().subscribe((res: any) => {
      this.rDay = res.remainDays;
      this.rWash = res.remainWash;
      const tomorrow = moment().add(res.remainDays, 'days');
      this.lDay = moment(tomorrow).format('YYYY-MM-DD');

    });
  }
  bookingRouter() {
    this.route.navigate(['/package']);
  }
  empRouter() {
    this.route.navigate(['/employee']);

  }
  serviceRouter() {
    this.route.navigate(['/service']);

  }
  subscription() {
    this.route.navigate(['/subscription/buy']);

  }
}
