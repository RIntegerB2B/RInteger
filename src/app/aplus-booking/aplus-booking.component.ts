import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { SwPush, SwUpdate } from '@angular/service-worker';

import {DashBoardService} from '../home/dashboard/dashboard.service';
import {AplusBookingService} from '../aplus-booking/aplus-booking.service';
import {mobileNumber} from '../shared/validation';
import {Aplus} from './aplus-booking.model';
import {Notification} from '../shared/notification.model';
import {Customer} from '../shared/customer.model';

@Component({
  selector: 'app-aplus-booking',
  templateUrl: './aplus-booking.component.html',
  styleUrls: ['./aplus-booking.component.css']
})
export class AplusBookingComponent implements OnInit {

  swPush: SwPush;
  userName: string;
  mobileNo: number;
  locat: string;
  aplusForm: FormGroup;
  aplusModel: Aplus;
  customer: Customer;
  notificationModel: Notification;
  message;
  action;
  email;
  photoShoot = ['Yes', 'No'];
  videoShoot = ['Yes', 'No'];
  shooting = [];
  readonly VAPID_PUBLIC_KEY = 'BEe66AvTCe_qowysFNV2QsGWzgEDnUWAJq1ytVSXxtwqjcf0bnc6d5USXmZOnIu6glj1BFcj87jIR5eqF2WJFEY';
  constructor( private fb: FormBuilder, private router: Router,
    private aplusService: AplusBookingService, private localStorageService: LocalStorageService,
    private swUpdate: SwUpdate, private injector: Injector, private snackBar: MatSnackBar,
    private dashboardService: DashBoardService) {
      try {
        this.swPush = this.injector.get(SwPush);
      } catch (error) {
        console.log(error);
      }
     }

  ngOnInit() {
    this.dashboardService.makeMenuTransparent();
    this.createForm();
    this.checkData();
  }
  createForm() {
    this.aplusForm = this.fb.group({
      mobileNumber: ['', mobileNumber],
      name: [''],
      location: [''],
      productDescription: [''],
      quantityDescription: [''],
      isVideoShoot: [''],
      isPhotoShoot: [''],
      emailId: ['']

    });
  }
  getShoot(data, isChecked) {
    const index = this.shooting.indexOf(data);
    if (isChecked) {
      this.shooting.push(data);
    } else  if (index > -1 ) {
      this.shooting.splice(index, 1);
    }
console.log(this.shooting);
  }
  bookSubmit(aplusForm: FormGroup, mobileNum: any, name: any, location: any, mailId: any) {
    this.message = 'A+ Cataloging Booking Done';
    this.action = 'booked';
    this.localStorageService.store('mobileno', mobileNum);
    this.localStorageService.store('name', name);
    this.localStorageService.store('location', location);
    this.localStorageService.store('emailId', mailId);
    this.aplusModel = new Aplus(
      aplusForm.controls.name.value,
      aplusForm.controls.mobileNumber.value,
      aplusForm.controls.location.value,
      aplusForm.controls.emailId.value,
      aplusForm.controls.productDescription.value,
      aplusForm.controls.quantityDescription.value,
      aplusForm.controls.isPhotoShoot.value,
      aplusForm.controls.isVideoShoot.value
    );
    this.aplusService.addBooking(this.aplusModel).subscribe(data => {
   this.snackBar.open(this.message, this.action, {
    duration: 3000,
  });
      this.router.navigate(['/dashboard/status', data.bookingOrderId]);
    }, error => {
      console.log(error);
    });
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.saveCustomerDetail(aplusForm);
    this.subscribe(this.mobileNo);
  }
  subscribe(mobNo) {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => {
        this.notificationModel = new Notification();
        this.notificationModel.isAdmin = false;
        this.notificationModel.userSubscriptions = sub;
        this.notificationModel.mobileNumber = mobNo;
        this.aplusService.addPushSubscriber(this.notificationModel).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
  checkData() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.userName = this.localStorageService.retrieve('name');
    this.locat = this.localStorageService.retrieve('location');
    this.email = this.localStorageService.retrieve('emailId');
  }
  saveCustomerDetail(catalogListingForm: FormGroup) {
    this.customer = new Customer(
      catalogListingForm.controls.mobileNumber.value,
      catalogListingForm.controls.name.value,
      catalogListingForm.controls.location.value,
      catalogListingForm.controls.emailId.value
    );
    this.customer.bookingType = 'A+ Cataloging Booking';
    this.aplusService.addCustomerDetail(this.customer).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }


}
