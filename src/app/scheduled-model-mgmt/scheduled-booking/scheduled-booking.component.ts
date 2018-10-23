import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { SwPush, SwUpdate } from '@angular/service-worker';
import {MatSnackBar} from '@angular/material';

import { Notification } from '../../shared/notification.model';
import {mobileNumber} from '../../shared/validation';
import {DashBoardService} from '../../home/dashboard/dashboard.service';
import {ScheduledModelService} from '../scheduled-model.service';
import {ScheduledBooking} from './scheduled-booking.model';


@Component({
  selector: 'app-scheduled-booking',
  templateUrl: './scheduled-booking.component.html',
  styleUrls: ['./scheduled-booking.component.css']
})
export class ScheduledBookingComponent implements OnInit {

  message;
  action;
  id;
  Model: ScheduledBooking[] = [];
  bookScheduledModelForm: FormGroup;
  userName: string;
  mobileNo: number;
  locat: string;
  bookingModel: ScheduledBooking;
/*   customerModel: CustomerDetail; */
  notificationModel: Notification;
  showEcommerce: boolean;
  showPortrait: boolean;
  showProduct: boolean;
  showProfile: boolean;
  showAll: boolean;
  showPortFolio: boolean;
  email;
  selected = 'Portfolio';
  readonly VAPID_PUBLIC_KEY = 'BEe66AvTCe_qowysFNV2QsGWzgEDnUWAJq1ytVSXxtwqjcf0bnc6d5USXmZOnIu6glj1BFcj87jIR5eqF2WJFEY';
  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private router: Router,
    private scheduledService: ScheduledModelService, private localStorageService: LocalStorageService,
    private swUpdate: SwUpdate, private swPush: SwPush , public snackBar: MatSnackBar , private dashBoardService: DashBoardService ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('modelId');
  }

  ngOnInit() {
    this.dashBoardService.makeMenuTransparent();
    this.viewModel(this.id);
    this.createForm();
    this.checkData();
    this.showEcommerce = true;
  }
  createForm() {
    this.bookScheduledModelForm = this.fb.group({
      name: [''],
      mobileNumber: [ mobileNumber],
      location: [''],
      productDescription: [''],
      qtyDescription: [''],
      id: [''],
      modelsname: [''],
      emailId: ['']
    });
  }

  checkData() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.userName = this.localStorageService.retrieve('name');
    this.locat = this.localStorageService.retrieve('location');
    this.email = this.localStorageService.retrieve('emailId');
  }
  viewModel(id) {
    this.scheduledService.modelDetail(id).subscribe(data => {
      this.Model = data;
      console.log(this.Model);
    });
  }
  ecommerceImage() {
    this.showEcommerce = true;
    this.showProfile = false;
    this.showPortrait = false;
    this.showProduct = false;
    this.showAll = false;
    this.showPortFolio = false;
  }
  productImage() {
    this.showEcommerce = false;
    this.showProfile = false;
    this.showPortrait = false;
    this.showProduct = true;
    this.showAll = false;
    this.showPortFolio = false;
  }
  portraitImage() {
    this.showEcommerce = false;
    this.showProfile = false;
    this.showPortrait = true;
    this.showProduct = false;
    this.showAll = false;
    this.showPortFolio = false;
  }
  portFolioImage() {
    this.showEcommerce = false;
    this.showProfile = false;
    this.showPortrait = false;
    this.showProduct = false;
    this.showAll = false;
    this.showPortFolio = true;
  }
  bookSubmit(bookModelForm: FormGroup, modelsId: any, modelNm: any, mailId: any) {
    this.message = 'Scheduled Model Shoot Booking Done';
    this.action = 'booked';
    this.mobileNo = bookModelForm.controls.mobileNumber.value;
    this.userName = bookModelForm.controls.name.value;
    this.locat = bookModelForm.controls.location.value;
    this.localStorageService.store('mobileno', this.mobileNo);
    this.localStorageService.store('name', this.userName);
    this.localStorageService.store('location', this.locat);
    this.localStorageService.store('emailId', mailId);
    this.bookingModel = new ScheduledBooking(
      bookModelForm.controls.name.value,
      bookModelForm.controls.mobileNumber.value,
      bookModelForm.controls.emailId.value,
      bookModelForm.controls.location.value,
      bookModelForm.controls.productDescription.value,
      bookModelForm.controls.qtyDescription.value
    );
    this.bookingModel.modelId = modelsId;
    this.bookingModel.modelsName = modelNm;
 /*    this.saveCustomerDetail(bookModelForm); */
    this.bookScheduledModelForm.reset();
    this.scheduledService.addScheduledBooking(this.bookingModel).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.router.navigate(['/status', data.bookingOrderId]);
    }, error => {
      console.log(error);
    });
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.subscribe(this.mobileNo);
  /*   this.sendNotification(); */
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
        this.scheduledService.addPushSubscriber(this.notificationModel).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
  /* saveCustomerDetail(bookModelForm: FormGroup) {
    this.customerModel = new CustomerDetail(
      bookModelForm.controls.mobileNumber.value,
      bookModelForm.controls.name.value,
      bookModelForm.controls.location.value,
      bookModelForm.controls.productDescription.value
    );
    this.modelService.addCustomerDetail(this.customerModel).subscribe(data => {
    }, error => {
      console.log(error);
    });
   }*/
 /*  sendNotification() {
    this.modelService.bookingNotification().subscribe(data => {
      console.log(data);
    });
  } */

}
