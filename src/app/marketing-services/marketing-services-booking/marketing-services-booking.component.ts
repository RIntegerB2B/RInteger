import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import {MatSnackBar} from '@angular/material';

import {MarketingServicesService} from '../marketing-services.service';
import {MarketingServicesBooking} from './marketingServices.model';
import {mobileNumber} from '../../shared/validation';
import {DashBoardService} from '../../home/dashboard/dashboard.service';
import { SwPush, SwUpdate } from '@angular/service-worker';
import {Notification} from '../../shared/notification.model';
import {Customer} from '../../shared/customer.model';


@Component({
  selector: 'app-marketing-services-booking',
  templateUrl: './marketing-services-booking.component.html',
  styleUrls: ['./marketing-services-booking.component.css']
})
export class MarketingServicesBookingComponent implements OnInit {
  message;
  action;
  marketingBookingForm: FormGroup;
  userName: string;
  mobileNo: number;
  locat: string;
  addMobileNo: number;
  addUserName: string;
  addLocation: string;
  customer: Customer;
  marketingBooking: MarketingServicesBooking;
  selectedMedium = [];
  notificationModel: Notification;
  marketingServices = ['Bulk SMS', 'Bulk Email', 'Bulk WhatsApp', 'Google', 'Facebook' , 'Database Booking', 'Customer Contact Management'];
  bookingId;
  email;
  mailId;
  swPush: SwPush;
  readonly VAPID_PUBLIC_KEY = 'BEe66AvTCe_qowysFNV2QsGWzgEDnUWAJq1ytVSXxtwqjcf0bnc6d5USXmZOnIu6glj1BFcj87jIR5eqF2WJFEY';


  constructor(private fb: FormBuilder, private router: Router,
    private marketingService: MarketingServicesService, private localStorageService: LocalStorageService, private swUpdate: SwUpdate,
    public snackBar: MatSnackBar , private dashBoardService: DashBoardService) { }
  ngOnInit() {
    this.dashBoardService.makeMenuTransparent();
    this.createForm();
    this.checkData();
  }
  createForm() {
    this.marketingBookingForm = this.fb.group({
      mobileNumber: ['', mobileNumber],
      name: [''],
      location: [''],
      marketing: [''],
      emailId: ['']
    });
  }
  checkData() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.userName = this.localStorageService.retrieve('name');
    this.locat = this.localStorageService.retrieve('location');
    this.email = this.localStorageService.retrieve('emailId');
  }
  getValue(marketingBookingForm, marketing, isChecked) {
    const marketingIndex = this.selectedMedium.indexOf(marketing);
    if (isChecked) {
      this.selectedMedium.push(marketing);
    } else if (marketingIndex > -1) {
      this.selectedMedium.splice(marketingIndex, 1);
    }
    console.log(this.selectedMedium);
  }
  booking(marketingBookingForm: FormGroup) {
    this.message = 'Marketing  Services  Booking Done';
    this.action = 'booked';
    this.addMobileNo = marketingBookingForm.controls.mobileNumber.value;
    this.addUserName = marketingBookingForm.controls.name.value;
    this.addLocation = marketingBookingForm.controls.location.value;
    this.mailId = marketingBookingForm.controls.emailId.value;
    this.localStorageService.store('mobileno', this.addMobileNo);
    this.localStorageService.store('name', this.addUserName);
    this.localStorageService.store('location', this.addLocation);
    this.localStorageService.store('emailId', this.mailId);
    this.marketingBooking = new MarketingServicesBooking(
      marketingBookingForm.controls.mobileNumber.value,
      marketingBookingForm.controls.name.value,
      marketingBookingForm.controls.location.value,
      marketingBookingForm.controls.emailId.value
    );
    this.marketingBooking.marketingMedium = this.selectedMedium;
    this.marketingService.marketingBooking(this.marketingBooking).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.router.navigate(['/status', data.bookingOrderId]);
    }, error => {
      console.log(error);
    });
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.saveCustomerDetail(marketingBookingForm);
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
        this.marketingService.addPushSubscriber(this.notificationModel).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
  saveCustomerDetail(marketingBookingForm: FormGroup) {
    this.customer = new Customer(
      marketingBookingForm.controls.mobileNumber.value,
      marketingBookingForm.controls.name.value,
      marketingBookingForm.controls.location.value,
      marketingBookingForm.controls.emailId.value
    );
    this.marketingService.addCustomerDetail(this.customer).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}
