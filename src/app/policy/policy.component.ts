import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilServiceService } from '../util-service.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {
  policy: any;

  constructor(private afs: AngularFirestore, private util: UtilServiceService) {
    this.afs.doc(`mainAdminConfiguration/IJ2gZiWf46mGgBS80nF9`).valueChanges().subscribe((res: any) => {
      this.policy = res.policy;
    });
  }

  ngOnInit() {
  }
  changePolicy() {
    const data = this.afs.doc(`mainAdminConfiguration/IJ2gZiWf46mGgBS80nF9`);
    data.update({
      policy: this.policy
    }).then(res => {
      this.util.notifyPrimary('policy is now updated...');
    }).catch(err => {
    });
  }

}
