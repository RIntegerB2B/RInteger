import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Booking } from './booking.model';
import { BookingService } from '../booking.service';
import { BookingId } from './bookingId.model';
import { mobileNumber } from './validation';
import { Notification } from './notification.model';
import { Customer } from './customer.model';

import { SwPush, SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  onBookInForm: FormGroup;
  userBook: Booking;
  id: BookingId;
  modelTypes = ['National', 'InterNational'];
  shootTypes = ['Men', 'Women', 'Kids', 'Others'];
  productTypes = ['Mannequin', 'TableTop', 'Others'];
  userName: string;
  mobileNo: number;
  locat: string;
  hideMobileNo: boolean;
  notificationModel: Notification;
  customer: Customer;
  readonly VAPID_PUBLIC_KEY = 'BEe66AvTCe_qowysFNV2QsGWzgEDnUWAJq1ytVSXxtwqjcf0bnc6d5USXmZOnIu6glj1BFcj87jIR5eqF2WJFEY';
  constructor(private fb: FormBuilder, private router: Router,
    private bookingService: BookingService, private localStorageService: LocalStorageService,
    private swUpdate: SwUpdate, private swPush: SwPush) { }

  ngOnInit() {
    this.createForm();
    this.checkData();
  }

  createForm() {
    this.onBookInForm = this.fb.group({
      mobileNumber: ['', mobileNumber],
      name: ['', Validators.required],
      location: [''],
      productDescription: [''],
      quantityDescription: [''],
      shootType: [''],
      modelType: [''],
      productType: [''],

    });
  }
  bookSubmit(onBookInForm: FormGroup, mobileNum: any, name: any, location: any) {
    this.localStorageService.store('mobileno', mobileNum);
    this.localStorageService.store('name', name);
    this.localStorageService.store('location', location);
    this.userBook = new Booking(
      onBookInForm.controls.name.value,
      onBookInForm.controls.mobileNumber.value,
      onBookInForm.controls.productDescription.value,
      onBookInForm.controls.quantityDescription.value,
      onBookInForm.controls.shootType.value,
      onBookInForm.controls.modelType.value,
      onBookInForm.controls.productType.value
    );
    this.saveCustomerDetail(onBookInForm);
    this.onBookInForm.reset();
    this.bookingService.addBooking(this.userBook).subscribe(data => {
      this.id = data;
      this.router.navigate(['/status', this.id._id]);
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
        this.bookingService.addPushSubscriber(notificationModel).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
  checkData() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.userName = this.localStorageService.retrieve('name');
    this.locat = this.localStorageService.retrieve('location');
  }
  saveCustomerDetail(onBookInForm: FormGroup) {
    this.customer = new Customer(
      onBookInForm.controls.mobileNumber.value,
      onBookInForm.controls.name.value,
      onBookInForm.controls.location.value,
      onBookInForm.controls.shootType.value,
      onBookInForm.controls.modelType.value,
    );
    this.bookingService.addCustomerDetail(this.customer).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}
