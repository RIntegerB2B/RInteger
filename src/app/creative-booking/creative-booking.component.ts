import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { SwPush, SwUpdate } from '@angular/service-worker';

import {DashBoardService} from '../home/dashboard/dashboard.service';
import {CreativeBookingService} from '../creative-booking/creative-booking.service';
import {mobileNumber} from './validation';
import {Creative} from './creative.model';
import {Notification} from './notification.model';


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
      shootType: [''],
      modelType: [''],
      productType: [''],

    });
  }
  bookSubmit(creativeForm: FormGroup, mobileNum: any, name: any, location: any) {
    this.message = 'Image Editing Booking Done';
    this.action = 'booked';
    this.localStorageService.store('mobileno', mobileNum);
    this.localStorageService.store('name', name);
    this.localStorageService.store('location', location);
    this.creativeModel = new Creative(
      creativeForm.controls.name.value,
      creativeForm.controls.mobileNumber.value,
      creativeForm.controls.productDescription.value,
      creativeForm.controls.quantityDescription.value,
      creativeForm.controls.shootType.value,
      creativeForm.controls.modelType.value,
      creativeForm.controls.productType.value
    );
    this.snackBar.open(this.message, this.action, {
      duration: 2000,
    });
    this.creativeForm.reset();
    this.creativeService.addBooking(this.creativeModel).subscribe(data => {
      console.log(data);
   /*    this.id = data; */
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
        this.creativeService.addPushSubscriber(this.notificationModel).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
  checkData() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.userName = this.localStorageService.retrieve('name');
    this.locat = this.localStorageService.retrieve('location');
  }

}