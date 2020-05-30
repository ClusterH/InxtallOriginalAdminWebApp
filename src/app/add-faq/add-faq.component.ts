import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UtilServiceService } from '../util-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.scss']
})
export class AddFaqComponent implements OnInit {
  private category: AngularFirestoreCollection;
  create: any = {};

  constructor(private afs: AngularFirestore, private util: UtilServiceService, private route: Router) {
    this.category = afs.collection('faq');
  }

  ngOnInit() {
  }
  save() {
    this.util.loaderStart();

    this.category.add(this.create).then(res => {
      console.log('res', res);
      this.util.notifyPrimary('Record Added');
      this.util.loaderStop();

      this.route.navigate(['/faq']);
    }).catch(err => {
      console.log('err', err);

    });
  }
}
