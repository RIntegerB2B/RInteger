import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { SwPush, SwUpdate } from '@angular/service-worker';

import {DashBoardService} from '../home/dashboard/dashboard.service';
import {ImageEditingService} from '../image-editing-booking/image-editing.service';
import {mobileNumber} from '../shared/validation';
import {ImageEditing} from './editing.model';
import {Notification} from '../shared/notification.model';
import {Customer} from '../shared/customer.model';

@Component({
  selector: 'app-image-editing-booking',
  templateUrl: './image-editing-booking.component.html',
  styleUrls: ['./image-editing-booking.component.css']
})
export class ImageEditingBookingComponent implements OnInit {
  swPush: SwPush;
  userName: string;
  mobileNo: number;
  locat: string;
  editingForm: FormGroup;
  editingModel: ImageEditing;
  notificationModel: Notification;
  message;
  customer: Customer;
  action;
  email;
  readonly VAPID_PUBLIC_KEY = 'BEe66AvTCe_qowysFNV2QsGWzgEDnUWAJq1ytVSXxtwqjcf0bnc6d5USXmZOnIu6glj1BFcj87jIR5eqF2WJFEY';
  constructor(private fb: FormBuilder, private router: Router,
    private editingService: ImageEditingService, private localStorageService: LocalStorageService,
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
    this.editingForm = this.fb.group({
      mobileNumber: ['', mobileNumber],
      name: [''],
      location: [''],
      imageDescription: [''],
      quantityDescription: [''],
      imageRequirements: [''],
      emailId: ['']
    });
  }
  bookSubmit(editingForm: FormGroup, mobileNum: any, name: any, location: any, mailId: any) {
    this.message = 'Image Editing Booking Done';
    this.action = 'booked';
    this.localStorageService.store('mobileno', mobileNum);
    this.localStorageService.store('name', name);
    this.localStorageService.store('location', location);
    this.localStorageService.store('emailId', mailId);
    this.editingModel = new ImageEditing(
      editingForm.controls.name.value,
      editingForm.controls.mobileNumber.value,
      editingForm.controls.location.value,
      editingForm.controls.emailId.value,
      editingForm.controls.imageDescription.value,
      editingForm.controls.quantityDescription.value,
      editingForm.controls.imageRequirements.value
    );
    this.editingService.addBooking(this.editingModel).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.router.navigate(['/dashboard/status', data.bookingOrderId]);
    }, error => {
      console.log(error);
    });
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.saveCustomerDetail(editingForm);
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
        this.editingService.addPushSubscriber(this.notificationModel).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
  checkData() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.userName = this.localStorageService.retrieve('name');
    this.locat = this.localStorageService.retrieve('location');
    this.email = this.localStorageService.retrieve('emailId');
  }
  saveCustomerDetail(editingForm: FormGroup) {
    this.customer = new Customer(
      editingForm.controls.mobileNumber.value,
      editingForm.controls.name.value,
      editingForm.controls.location.value,
      editingForm.controls.emailId.value
    );
    this.customer.bookingType = 'Editing Booking';
    this.editingService.addCustomerDetail(this.customer).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}
