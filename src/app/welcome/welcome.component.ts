import { Component, OnInit } from '@angular/core';
import { UtilServiceService } from '../util-service.service';
declare var moment: any;
import { NgxSpinnerService } from 'ngx-spinner';
import { CollapseModule } from 'ngx-bootstrap';
import { MessagingService } from '../messaging.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  // Skycons = require('skycons')(window);
  liveTime: any;
  hours: any;
  focus: any;
  chkfocus: string;
  thougt: any;
  auther: any;
  username: string;
  usernameTXT: any = false;
  status: string;
  dblClick: any = 0;
  constructor(private util: UtilServiceService, private spinner: NgxSpinnerService, private msgService: MessagingService) {

    console.log(' this.util.getCurruntUser();', this.util.getCurruntUser());
    // this.spinner.show();
    this.getCuruntWhether();
    this.thoughtOfTheDay();
    this.liveClock();
    this.chkfocus = localStorage.getItem('focus') || '';
    this.focus = localStorage.getItem('focus') || '';
    this.username = localStorage.getItem('username') || 'Dblclick to change';
    this.hours = moment().hour();
    if (this.hours >= 1 && this.hours <= 12) {
      this.status = 'Good Morning';
    } else if (this.hours > 12 && this.hours < 16) {
      this.status = 'Good Noon';
    } else if (this.hours >= 16 && this.hours <= 20) {
      this.status = 'Good Evening';
    } else {
      this.status = 'Still Not Slipping';
    }
    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 50000);
  }

  action() {
    localStorage.setItem('focus', this.focus);
    this.chkfocus = this.focus;
  }
  ngOnInit() {
    // this.Skycons.add('icon', 'PARTLY_CLOUDY_DAY');
    const token = this.msgService.getPermission();

  }
  thoughtOfTheDay() {
    this.util.httpGetReq('https://favqs.com/api/qotd').subscribe((res: any) => {

      // this.thougt = res.contents.quotes['0'].quote;
      // this.auther = res.contents.quotes['0'].author;
      this.thougt = res.quote.body;
      this.auther = res.quote.author;
    }, (err) => {

    });
  }
  getCuruntWhether() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        // tslint:disable-next-line:max-line-length
        this.util.httpGetReq(`https://api.darksky.net/forecast/8af3c5e01b8c727b7164a499f482d664/${position.coords.latitude},${position.coords.longitude}?exclude=minutely,hourly,daily,alerts,flags`).subscribe(res => {

        }, err => {

        });

      });
    } else {

    }

    //
  }
  liveClock() {
    setInterval(() => { this.liveTime = moment().format('HH:mm:ss'); }, 1000);
  }
  deleteFocus() {
    localStorage.removeItem('focus');
    this.chkfocus = null;
    this.focus = null;
  }
  toggalTXT() {
    this.dblClick += 1;
    setTimeout(() => {
      if (this.dblClick === 2) {
        this.usernameTXT = true;
      } else {
        this.dblClick = 0;
      }
    }, 300);
  }
  changeUserName() {
    localStorage.setItem('username', this.username);
    this.usernameTXT = false;
  }
  showPosition(position) {

  }
}
