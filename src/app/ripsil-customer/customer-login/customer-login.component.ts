import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { RipsilCustomerService } from '../ripsil-customer.service';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { element } from 'protractor';
import { Notification } from '../../shared/notification.model';
import { LocalStorageService } from 'ngx-webstorage';
import { CustomerLogIn } from '../../shared/customer-login.model';
import { mobileNumber } from '../../shared/validation';
import { MatSnackBar } from '@angular/material';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {
  showError2: boolean;
  customerloginForm: FormGroup;
  register: boolean;
  storedMobileNo;
  customerModel: CustomerLogIn;
  registerCustomer: CustomerLogIn;
  showError: boolean;
  message;
  action;
  VAPID_PUBLIC_KEY = 'BEe66AvTCe_qowysFNV2QsGWzgEDnUWAJq1ytVSXxtwqjcf0bnc6d5USXmZOnIu6glj1BFcj87jIR5eqF2WJFEY';
  notificationModel: Notification;
  dataValue: CustomerLogIn;
  constructor(private fb: FormBuilder, private ripsilCustomerService: RipsilCustomerService,
    private router: Router, public snackBar: MatSnackBar, private swUpdate: SwUpdate,
    private localStorageService: LocalStorageService, private swPush: SwPush,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
    this.createViewForm();
    this.storedMobileNo = this.localStorageService.retrieve('mobileNumber');
  }
  createViewForm() {
    this.customerloginForm = this.fb.group({
      mobileNumber: [/* {value: '', disabled: true}, */'', mobileNumber],
      password: ['', Validators.required]
    });
  }
  showRegister() {
    this.register = true;
  }
  showLogin() {
    this.register = false;
  }
  login(customerloginForm: FormGroup) {
    this.registerCustomer = new CustomerLogIn();
    this.registerCustomer.mobileNumber = customerloginForm.controls.mobileNumber.value;
    this.registerCustomer.password = customerloginForm.controls.password.value;
    this.ripsilCustomerService.signIn(this.registerCustomer).subscribe(data => {
      this.dataValue = data;
      if (data === null) {
        this.showError = false;
        this.showError2 = true;
      } else if (data.password === undefined) {
        this.showError2 = true;
        this.showError = false;
      } else if (data.password !== customerloginForm.controls.password.value) {
        this.showError2 = false;
        this.showError = true;
      } else if (data !== null) {
        this.localStorageService.store('userLoggedIn', 'true');
        this.localStorageService.store('mobileNumber', customerloginForm.controls.mobileNumber.value);
        this.subscribe(data.mobileNumber);
        this.router.navigate(['/dashboard/activitylog', 20]);
      }
    }, error => {
      console.log(error);
    });
  }
  subscribe(mobNo) {
    this.swPush.requestSubscription({
      serverPublicKey: 'BEe66AvTCe_qowysFNV2QsGWzgEDnUWAJq1ytVSXxtwqjcf0bnc6d5USXmZOnIu6glj1BFcj87jIR5eqF2WJFEY'
    })
      .then(sub => {
        this.notificationModel = new Notification();
        this.notificationModel.userSubscriptions = sub;
        this.notificationModel.mobileNumber = mobNo;
        this.ripsilCustomerService.addPushSubscriber(this.notificationModel).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
}
