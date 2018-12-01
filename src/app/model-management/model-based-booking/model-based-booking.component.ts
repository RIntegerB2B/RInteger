import { Component, OnInit, AfterViewInit , Inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { SwPush, SwUpdate } from '@angular/service-worker';
import {MatSnackBar} from '@angular/material';

import { ModelManagementService } from '../model-management.service';
import { ModelDetail } from './model.model';
import { ModelBooking } from './model-booking.model';
import { Customer } from '../../shared/customer.model';
import { Notification } from '../../shared/notification.model';
import { mobileNumber } from '../../shared/validation';
import { DashBoardService } from '../../home/dashboard/dashboard.service';
import { ProgressBarService } from '../../home/progress-bar/progress-bar.service';

@Component({
  selector: 'app-model-based-booking',
  templateUrl: './model-based-booking.component.html',
  styleUrls: ['./model-based-booking.component.css']
})
export class ModelBasedBookingComponent implements OnInit {
  message;
  action;
  id;
  Model: ModelDetail[] = [];
  bookModelForm: FormGroup;
  userName: string;
  mobileNo: number;
  locat: string;
  bookingModel: ModelBooking;
  customerModel: Customer;
  notificationModel: Notification;
  showEcommerce: boolean;
  showPortrait: boolean;
  showProduct: boolean;
  showProfile: boolean;
  showMeasurements: boolean;
  showAll: boolean;
  showPortFolio: boolean;
  email;
  selected = 'Portfolio';
  selectedType;
  myCarouselOptions = { items: 1, dots: true, nav: true,
  };
  services = [
    { id: 0, name: 'Portfolio' },
    { id: 1, name: 'Ecommerce' },
    { id: 2, name: 'Product' },
    { id: 3, name: 'Measurements' },
  ];
  readonly VAPID_PUBLIC_KEY = 'BEe66AvTCe_qowysFNV2QsGWzgEDnUWAJq1ytVSXxtwqjcf0bnc6d5USXmZOnIu6glj1BFcj87jIR5eqF2WJFEY';
  username;
  constructor( private activatedRoute: ActivatedRoute,
   private fb: FormBuilder, private router: Router,
    private modelService: ModelManagementService, private localStorageService: LocalStorageService,
    private swUpdate: SwUpdate, private swPush: SwPush, public snackBar: MatSnackBar , private dashBoardService: DashBoardService,
    private progressBarService: ProgressBarService
     ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('modelId');
    console.log('model', this.id);
  }

  ngOnInit() {
    this.dashBoardService.makeMenuTransparent();
    this.viewModel(this.id);
    this.createForm();
    this.checkData();
    this.showPortFolio = true;
    this.onSelect(this.services[0]);
  }
  createForm() {
    this.bookModelForm = this.fb.group({
      name: [''],
      mobileNumber: ['', mobileNumber],
      location: [''],
      productDescription: [''],
      qtyDescription: [''],
      id: [''],
      modelsname: [''],
      emailId: ['']
    });
  }
  onSelect(service): void {
    switch (service.id) {
      case 0: {
        this.portFolioImage();
        break;
      }
      case 1: {
        this.ecommerceImage();
        break;
      }
      case 2: {
        this.productImage();
        break;
      }
      case 3: {
        this.measurements();
        break;
      }
  }
  this.selectedType = service;
}
  checkData() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.userName = this.localStorageService.retrieve('name');
    this.locat = this.localStorageService.retrieve('location');
    this.email = this.localStorageService.retrieve('emailId');
  }
  viewModel(id) {
    /* this.progressBarService.open(); */
    this.modelService.modelDetail(id).subscribe(data => {
      this.Model = data;
      /* this.progressBarService.close(); */
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
    this.showMeasurements = false;
  }
  productImage() {
    this.showEcommerce = false;
    this.showProfile = false;
    this.showPortrait = false;
    this.showProduct = true;
    this.showAll = false;
    this.showPortFolio = false;
    this.showMeasurements = false;
  }
  portraitImage() {
    this.showEcommerce = false;
    this.showProfile = false;
    this.showPortrait = true;
    this.showProduct = false;
    this.showAll = false;
    this.showPortFolio = false;
    this.showMeasurements = false;
  }
  portFolioImage() {
    this.showEcommerce = false;
    this.showProfile = false;
    this.showPortrait = false;
    this.showProduct = false;
    this.showAll = false;
    this.showPortFolio = true;
    this.showMeasurements = false;
  }
  measurements() {
    this.showEcommerce = false;
    this.showProfile = false;
    this.showPortrait = false;
    this.showProduct = false;
    this.showAll = false;
    this.showPortFolio = false;
    this.showMeasurements = true;
  }
  bookSubmit(bookModelForm: FormGroup, modelsId: any, modelNm: any, mailId: any) {
    this.message = 'Model Shoot Booking Done';
    this.action = 'booked';
    this.mobileNo = bookModelForm.controls.mobileNumber.value;
    this.userName = bookModelForm.controls.name.value;
    this.locat = bookModelForm.controls.location.value;
    this.localStorageService.store('mobileno', this.mobileNo);
    this.localStorageService.store('name', this.userName);
    this.localStorageService.store('location', this.locat);
    this.localStorageService.store('emailId', mailId);
    this.bookingModel = new ModelBooking(
      bookModelForm.controls.name.value,
      bookModelForm.controls.mobileNumber.value,
      bookModelForm.controls.emailId.value,
      bookModelForm.controls.location.value,
      bookModelForm.controls.productDescription.value,
      bookModelForm.controls.qtyDescription.value
    );
    this.bookingModel.modelId = modelsId;
    this.bookingModel.modelsName = modelNm;
    this.saveCustomerDetail(bookModelForm);
    this.bookModelForm.reset();
    this.modelService.addModelBooking(this.bookingModel).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.router.navigate(['/dashboard/status', data.bookingOrderId]);
    }, error => {
      console.log(error);
    });
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.username = this.localStorageService.retrieve('name');
    this.subscribe(this.mobileNo, this.username);
  /*   this.sendNotification(); */
  }
  subscribe(mobNo, name) {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => {
        this.notificationModel = new Notification();
        this.notificationModel.name = name;
        this.notificationModel.isAdmin = false;
        this.notificationModel.userSubscriptions = sub;
        this.notificationModel.mobileNumber = mobNo;
        this.modelService.addPushSubscriber(this.notificationModel).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
  saveCustomerDetail(bookModelForm: FormGroup) {
    this.customerModel = new Customer(
      bookModelForm.controls.mobileNumber.value,
      bookModelForm.controls.name.value,
      bookModelForm.controls.location.value,
      bookModelForm.controls.productDescription.value
    );
    this.customerModel.bookingType = 'Model Booking';
    this.customerModel.modelType = this.Model[0].modelType;
    this.customerModel.shootType = this.Model[0].categoryType;
    this.modelService.addCustomerDetail(this.customerModel).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }
 /*  sendNotification() {
    this.modelService.bookingNotification().subscribe(data => {
      console.log(data);
    });
  } */
}
