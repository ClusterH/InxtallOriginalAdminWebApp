
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'carBoy';
  auth: any;
  constructor(private router: Router) {
    this.auth = JSON.parse(localStorage.getItem('fragile')) || false;
    // console.log(' this.auth', this.auth);
    if (this.auth === '404') {
      this.router.navigate(['subscription/buy']);
    } else if (this.auth) {
      this.router.navigate(['welcome']);
    } else {
      this.router.navigate(['login']);
    }
  }
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }

}
