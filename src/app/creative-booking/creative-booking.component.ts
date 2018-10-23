import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { SwPush, SwUpdate } from '@angular/service-worker';

import {DashBoardService} from '../home/dashboard/dashboard.service';
import {CreativeBookingService} from '../creative-booking/creative-booking.service';
import {mobileNumber} from '../shared/validation';
import {Creative} from './creative.model';
import {Notification} from '../shared/notification.model';
import {Customer} from '../shared/customer.model';


@Component({
  selector: 'app-creative-booking',
  templateUrl: './creative-booking.component.html',
  styleUrls: ['./creative-booking.component.css']
})
export class CreativeBookingComponent implements OnInit {

  swPush: SwPush;
  userName: string;
  mobileNo: number;
  locat: string;
  creativeForm: FormGroup;
  creativeModel: Creative;
  notificationModel: Notification;
  message;
  action;
  email;
  customer: Customer;
  videoShoot = ['Yes', 'No'];
  shootTypes = ['Indoor shoot', 'Outdoor shoot'];
  shooting = [];
  readonly VAPID_PUBLIC_KEY = 'BEe66AvTCe_qowysFNV2QsGWzgEDnUWAJq1ytVSXxtwqjcf0bnc6d5USXmZOnIu6glj1BFcj87jIR5eqF2WJFEY';
  constructor(private fb: FormBuilder, private router: Router,
    private creativeService: CreativeBookingService, private localStorageService: LocalStorageService,
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
    this.creativeForm = this.fb.group({
      mobileNumber: ['', mobileNumber],
      name: [''],
      location: [''],
      productDescription: [''],
      quantityDescription: [''],
      shootPurpose: [''],
      isVideoShoot: [''],
      shootType: [''],
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
  bookSubmit(creativeForm: FormGroup, mobileNum: any, name: any, location: any, mailId: any) {
    this.message = 'Creative Booking Done';
    this.action = 'booked';
    this.localStorageService.store('mobileno', mobileNum);
    this.localStorageService.store('name', name);
    this.localStorageService.store('location', location);
    this.localStorageService.store('emailId', mailId);
    this.creativeModel = new Creative(
      creativeForm.controls.name.value,
      creativeForm.controls.mobileNumber.value,
      creativeForm.controls.location.value,
      creativeForm.controls.emailId.value,
      creativeForm.controls.productDescription.value,
      creativeForm.controls.quantityDescription.value,
      creativeForm.controls.shootPurpose.value,
      creativeForm.controls.isVideoShoot.value
    );
    this.creativeModel.shootType = this.shooting;
    this.creativeService.addBooking(this.creativeModel).subscribe(data => {
   this.snackBar.open(this.message, this.action, {
    duration: 3000,
  });
      this.router.navigate(['/status', data.bookingOrderId]);
    }, error => {
      console.log(error);
    });
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.saveCustomerDetail(creativeForm);
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
        this.creativeService.addPushSubscriber(this.notificationModel).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
  checkData() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.userName = this.localStorageService.retrieve('name');
    this.locat = this.localStorageService.retrieve('location');
    this.email = this.localStorageService.retrieve('emailId');
  }
  saveCustomerDetail(creativeForm: FormGroup) {
    this.customer = new Customer(
      creativeForm.controls.mobileNumber.value,
      creativeForm.controls.name.value,
      creativeForm.controls.location.value,
      creativeForm.controls.emailId.value
    );
    this.creativeService.addCustomerDetail(this.customer).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}
