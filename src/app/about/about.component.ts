import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilServiceService } from '../util-service.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  about: any;

  constructor(private afs: AngularFirestore, private util: UtilServiceService) {
    this.afs.doc(`mainAdminConfiguration/IJ2gZiWf46mGgBS80nF9`).valueChanges().subscribe((res: any) => {
      this.about = res.about;
    });
  }

  ngOnInit() {
  }
  changeAbout() {
    const data = this.afs.doc(`mainAdminConfiguration/IJ2gZiWf46mGgBS80nF9`);
    data.update({
      about: this.about
    }).then(res => {
      this.util.notifyPrimary('About us is now updated...');
    }).catch(err => {

    });
  }

}
