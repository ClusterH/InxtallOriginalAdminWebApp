import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UtilServiceService } from '../util-service.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MarchantData } from '../marchant-data';
declare var jQuery: any;
// declare var form: any;

@Component({
  selector: 'app-registration-merchant',
  templateUrl: './registration-merchant.component.html',
  styleUrls: ['./registration-merchant.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationMerchantComponent implements OnInit {
  // create: any = { name: 'fsdfsdf' };
  create: any = [];
  name = 'adsadsa';
  itemsCollection: any;
  constructor(private util: UtilServiceService, private afs: AngularFirestore, private router: Router) {
    this.itemsCollection = afs.collection('users');

  }

  ngOnInit() {
    const form = jQuery('#basic-forms');
    const that = this;
    jQuery('#basic-forms').steps({
      headerTag: 'h3',
      bodyTag: 'fieldset',
      transitionEffect: 'fade',
      enableAllSteps: false,
      enablePagination: true,
      transitionEffectSpeed: 300,
      labels: {
        next: 'Continue',
        previous: 'Back',
        finish: 'Proceed to Login'
      },
      onFinished: function (event, currentIndex) {
        that.util.loaderStart();

        // url = window.location.origin + window.location.pathname
        // url = url.slice(0, -1)
        // var name = url.substring(0, url.lastIndexOf("/"));
        // name = name + '/public/';
        // window.location.href = name;
        const temp = jQuery('#basic-forms').serializeArray();
        const finalData: MarchantData = {
          token: '',
          role: 1,
          name: '',
          email: '',
          description: '',
          password: '',
          noOfEmp: 0,
          noOfService: 0,
          radius: 5,
          status: 'Active',
          shopName: '',
          username: '',
          coverImage: 'https://cache.ocean-sandbox.com/img/front/cag/default-cover.jpg',
          lat: 0,
          lng: 0,
          profileImage: 'https://dumielauxepices.net/sites/default/files/person-icons-avatar-711972-5314933.png',
          time: [{
            'end': '21:00',
            'start': '09:00'
          }, {
            'end': '20:00',
            'start': '10:00'
          }, {
            'end': '20:00',
            'start': '10:00'
          }, {
            'end': '20:00',
            'start': '10:00'
          }, {
            'end': '20:00',
            'start': '10:00'
          }, {
            'end': '21:00',
            'start': '09:00'
          }, {
            'end': '21:00',
            'start': '09:00'
          }],

          address: '',
          phone: '',
          service: '',
          remainWash: 50,
          remainDays: 30,
          purchaseStatus: 'Active',
          adminStatus: 'Active',
          PayPalEnvironmentProduction: '',
          PayPalEnvironmentSandbox: '',
        };
        jQuery(temp).each(function (index, obj) {
          finalData[obj.name] = obj.value;
        });
        // finalData[status] = 'Active';

        that.util.register(jQuery('#email').val(), jQuery('#password').val()).then((data) => {

          // const id = this.afs.createId();

          that.itemsCollection.doc(data.user.uid).set(finalData);
          // that.util.updataWithNewData('user', data.user.uid, this.create).then(() => {

          that.util.notifyPrimary('Added');
          that.util.loaderStop();

          that.router.navigate(['login']);
          // });

        }, (err) => {

          that.util.loaderStop();
          that.util.notifyDanger(err.message);

        });

      },
      onStepChanging: function (event, currentIndex, newIndex) {

        form.validate({
          errorPlacement: function errorPlacement(error, element) {
            element.after(error);
          },
          rules: {
            conf_confirm: {
              equalTo: '#password'
            }, name: {
              required: true,
              minlength: 5,
              maxlength: 25,
            }, username: {
              required: true,
              minlength: 5,
              maxlength: 25,
            }
          }
        });
        if (newIndex >= 1) {

        } else {

        }
        if (newIndex === 1) {

        } else {

        }
        form.validate().settings.ignore = ':disabled,:hidden';
        return form.valid();
        // return true;
      }
    });
  }

}
