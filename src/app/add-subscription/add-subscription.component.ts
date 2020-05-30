import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Category } from '../category';
import { UtilServiceService } from '../util-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.scss']
})
export class AddSubscriptionComponent implements OnInit {
  private subscription: AngularFirestoreCollection<Category>;
  create: any = {};
  file: any;
  constructor(private afs: AngularFirestore, private util: UtilServiceService, private route: Router) {

  }

  ngOnInit() {
  }

  store() {
    this.util.loaderStart();

    const category = this.afs.collection(`subscription`);
    category.add(this.create).then(res => {
      this.util.notifyPrimary('Record Added');
      this.create = {};
      this.file = '';
      this.util.loaderStop();

      this.route.navigate(['/subscription']);
    }).catch(err => {

    });

  }

}
