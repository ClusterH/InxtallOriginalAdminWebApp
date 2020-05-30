import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Category } from '../category';
import { UtilServiceService } from '../util-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-main-category',
  templateUrl: './add-main-category.component.html',
  styleUrls: ['./add-main-category.component.scss']
})
export class AddMainCategoryComponent implements OnInit {
  private category: AngularFirestoreCollection<Category>;
  create: Category = { name: '', icon: '', status: '' };

  constructor(private afs: AngularFirestore, private util: UtilServiceService, private route: Router) {
    this.category = afs.collection<Category>('category');

  }

  ngOnInit() {
  }
  save() {
    this.util.loaderStart();

    this.category.add(this.create).then(res => {
      console.log('res', res);
      this.util.notifyPrimary('Record Added');
      this.util.loaderStop();

      this.route.navigate(['/category']);
    }).catch(err => {
      console.log('err', err);

    });
  }
}
