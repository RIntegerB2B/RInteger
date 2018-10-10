import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { MatSnackBar } from '@angular/material';

import { ItServicesService } from '../it-services-booking/it-services.service';
import { ITServicesBooking } from './it-services.model';
import { mobileNumber } from '../shared/validation';
import { DashBoardService } from '../home/dashboard/dashboard.service';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { Notification } from '../shared/notification.model';

@Component({
  selector: 'app-it-services-booking',
  templateUrl: './it-services-booking.component.html',
  styleUrls: ['./it-services-booking.component.css']
})
export class ItServicesBookingComponent implements OnInit {
  message;
  action;
  itServicesBookingForm: FormGroup;
  userName: string;
  mobileNo: number;
  locat: string;
  addMobileNo: number;
  addUserName: string;
  addLocation: string;
  itServicesBooking: ITServicesBooking;
  selectedMedium = [];
  notificationModel: Notification;
  itServices = ['Domain Registration', 'WebApp Development', 'WebSite Development',
    'Hosting Services', 'Customer Contact Management', 'Bulk SMS'];
  bookingId;
  email;
  mailId;
  swPush: SwPush;
  readonly VAPID_PUBLIC_KEY = 'BEe66AvTCe_qowysFNV2QsGWzgEDnUWAJq1ytVSXxtwqjcf0bnc6d5USXmZOnIu6glj1BFcj87jIR5eqF2WJFEY';

  constructor(private fb: FormBuilder, private router: Router,
    private itService: ItServicesService, private localStorageService: LocalStorageService, private swUpdate: SwUpdate,
    public snackBar: MatSnackBar, private dashBoardService: DashBoardService) { }
  ngOnInit() {
    this.dashBoardService.makeMenuTransparent();
    this.createForm();
    this.checkData();
  }
  createForm() {
    this.itServicesBookingForm = this.fb.group({
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
  getValue(itServicesBookingForm, marketing, isChecked) {
    const marketingIndex = this.selectedMedium.indexOf(marketing);
    if (isChecked) {
      this.selectedMedium.push(marketing);
    } else if (marketingIndex > -1) {
      this.selectedMedium.splice(marketingIndex, 1);
    }
    console.log(this.selectedMedium);
  }
  booking(itServicesBookingForm: FormGroup) {
    this.message = 'IT  Services  Booking Done';
    this.action = 'booked';
    this.addMobileNo = itServicesBookingForm.controls.mobileNumber.value;
    this.addUserName = itServicesBookingForm.controls.name.value;
    this.addLocation = itServicesBookingForm.controls.location.value;
    this.mailId = itServicesBookingForm.controls.emailId.value;
    this.localStorageService.store('mobileno', this.addMobileNo);
    this.localStorageService.store('name', this.addUserName);
    this.localStorageService.store('location', this.addLocation);
    this.localStorageService.store('emailId', this.mailId);
    this.itServicesBooking = new ITServicesBooking(
      itServicesBookingForm.controls.mobileNumber.value,
      itServicesBookingForm.controls.name.value,
      itServicesBookingForm.controls.location.value,
      itServicesBookingForm.controls.emailId.value
    );
    this.itServicesBooking.services = this.selectedMedium;
    this.itService.addBooking(this.itServicesBooking).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.router.navigate(['/status', data.bookingOrderId]);
    }, error => {
      console.log(error);
    });
    this.mobileNo = this.localStorageService.retrieve('mobileno');
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
        this.itService.addPushSubscriber(this.notificationModel).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
}
