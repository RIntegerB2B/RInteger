import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { SwPush, SwUpdate } from '@angular/service-worker';

import { ModelManagementService } from '../model-management.service';
import { ModelDetail } from './model.model';
import { ModelBooking } from './model-booking.model';
import { CustomerDetail } from '../model-based-booking/customer-detail.model';
import { ModelBookingNotification } from '../model-based-booking/notification.model';
import {mobileNumber} from '../../booking/booking/validation';

@Component({
  selector: 'app-model-based-booking',
  templateUrl: './model-based-booking.component.html',
  styleUrls: ['./model-based-booking.component.css']
})
export class ModelBasedBookingComponent implements OnInit {
  id;
  Model: ModelDetail[] = [];
  bookModelForm: FormGroup;
  userName: string;
  mobileNo: number;
  locat: string;
  bookingModel: ModelBooking;
  customerModel: CustomerDetail;
  notificationModel: ModelBookingNotification;
  readonly VAPID_PUBLIC_KEY = 'BEe66AvTCe_qowysFNV2QsGWzgEDnUWAJq1ytVSXxtwqjcf0bnc6d5USXmZOnIu6glj1BFcj87jIR5eqF2WJFEY';
  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private router: Router,
    private modelService: ModelManagementService, private localStorageService: LocalStorageService,
    private swUpdate: SwUpdate, private swPush: SwPush) {
    this.id = this.activatedRoute.snapshot.paramMap.get('modelId');
  }

  ngOnInit() {
    this.viewModel(this.id);
    this.createForm();
    this.checkData();
  }
  createForm() {
    this.bookModelForm = this.fb.group({
      name: ['', Validators.required],
      mobileNumber: [ mobileNumber],
      location: ['', Validators.required],
      productDescription: [''],
      qtyDescription: [''],
      id: [''],
      modelsname: ['']
    });
  }
  checkData() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.userName = this.localStorageService.retrieve('name');
    this.locat = this.localStorageService.retrieve('location');
  }
  viewModel(id) {
    this.modelService.modelDetail(id).subscribe(data => {
      this.Model = data;
    });
  }
  bookSubmit(bookModelForm: FormGroup, modelsId: any, modelNm: any) {
    this.mobileNo = bookModelForm.controls.mobileNumber.value;
    this.userName = bookModelForm.controls.name.value;
    this.locat = bookModelForm.controls.location.value;
    this.localStorageService.store('mobileno', this.mobileNo);
    this.localStorageService.store('name', this.userName);
    this.localStorageService.store('location', this.locat);
    this.bookingModel = new ModelBooking(
      bookModelForm.controls.name.value,
      bookModelForm.controls.mobileNumber.value,
      bookModelForm.controls.location.value,
      bookModelForm.controls.productDescription.value,
      bookModelForm.controls.qtyDescription.value
    );
    this.bookingModel.modelId = modelsId;
    this.bookingModel.modelsName = modelNm;
    this.saveCustomerDetail(bookModelForm);
    this.bookModelForm.reset();
    this.modelService.addModelBooking(this.bookingModel).subscribe(data => {
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
        this.notificationModel = new ModelBookingNotification();
        this.notificationModel.isAdmin = false;
        this.notificationModel.userSubscriptions = sub;
        this.notificationModel.mobileNumber = mobNo;
        this.modelService.addPushSubscriber(this.notificationModel).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
  saveCustomerDetail(bookModelForm: FormGroup) {
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
  }
}
