import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Booking } from './booking.model';
import {BookingService } from '../booking.service';
import { BookingId} from './bookingId.model';
import {mobileNumber} from './validation';
import {Notification} from './notification.model';

import { SwPush, SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  onBookInForm: FormGroup;
  userBook: Booking ;
  id: BookingId;
  modelTypes = ['National', 'InterNational'];
  shootTypes = ['Men', 'Women', 'Kids'];
  userName: string;
  mobileNo: string;
  hideMobileNo: boolean;
  notificationModel: Notification;
  readonly VAPID_PUBLIC_KEY = 'BIvwBoUek8ZLiE2HRr_srixb0Qi-Ql6CVBhhhvIuuZ5PMFYrfP0zSkNRrHD-uvIBhJ3_BDmzSFedMzu5ZuaVVRM';
  constructor(private fb: FormBuilder, private router: Router,
    private bookingService: BookingService, private localStorageService: LocalStorageService ,
    private swUpdate: SwUpdate, private swPush: SwPush) { }

  ngOnInit() {
    this.createForm();
     this.checkData();
  }

  createForm() {
    this.onBookInForm = this.fb.group({
      mobileNumber: ['', mobileNumber],
      name: ['', Validators.required],
      productDescription: [''],
      quantityDescription: [''],
      shootType: [''],
      modelType: [''],
      rememberMe: ['']

    });
  }
  bookSubmit(onBookInForm: FormGroup, mobileNum: any, name: any) {
    this.localStorageService.store('mobileno', mobileNum);
    this.localStorageService.store('name', name);
    this.userBook = new Booking(
      onBookInForm.controls.name.value,
      onBookInForm.controls.mobileNumber.value,
      onBookInForm.controls.productDescription.value,
      onBookInForm.controls.quantityDescription.value,
      onBookInForm.controls.shootType.value,
      onBookInForm.controls.modelType.value,
    );
    this.onBookInForm.reset();
    this.bookingService.addBooking(this.userBook).subscribe(data => {
this.id = data;
this.router.navigate(['/status', this.id._id]);
    }, error => {
      console.log(error);
    });
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.subscribe( this.mobileNo);
  }
  subscribe(no) {
    alert('subscribe');
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => this.bookingService.addPushSubscriber(sub, no).subscribe())
      .catch(err => console.error('Could not subscribe to notifications', err));
  }


 /*  saveData(onBookInForm, mobileNum, name) {
    this.localStorageService.store('mobileno', mobileNum);
    this.localStorageService.store('name', name);
  } */

  checkData() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.userName = this.localStorageService.retrieve('name');
  }
}
