import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import {MatSnackBar} from '@angular/material';
import { SwPush, SwUpdate } from '@angular/service-worker';

import { DigitalMgmtService } from './digital-mgmt.service';
import { mobileNumber } from '../shared/validation';
import { DigitalMgmtBooking } from './digital-mgmt.model';
import {DashBoardService} from '../home/dashboard/dashboard.service';
import { Notification } from '../shared/notification.model';
import {Customer} from '../shared/customer.model';

@Component({
  selector: 'app-digital-mgmt-booking',
  templateUrl: './digital-mgmt-booking.component.html',
  styleUrls: ['./digital-mgmt-booking.component.css']
})
export class DigitalMgmtBookingComponent implements OnInit {

  message;
  action;
  digitalMgmtForm: FormGroup;
  notificationModel: Notification;
  userName: string;
  mobileNo: number;
  locat: string;
  customer: Customer;
  addMobileNo: number;
  addUserName: string;
  addLocation: string;
  digitalModel: DigitalMgmtBooking;
  platFormType = ['B2BNational', 'B2BInternational', 'B2CNational', 'B2CInternational', 'SocialMedia'];
  b2bNational = ['Alibaba (www.alibaba.com)', 'Amazon India (www.amazon.in)', 'Meesho (www.meesho.com)', 'Reliance',
  'Udaan (www.udaan.com)',
 'WholesaleBox (www.wholesalebox.in)', 'IndiaMART (www.indiamart.com)', 'Trade India (www.tradeindia.com)'];
  b2bInternational = ['Alibaba (www.alibaba.com)'];
  b2cNational = ['Amazon India (www.amazon.in)', 'LimeRoad (www.limeroad.com)' ,
  'Shopclues (www.shopclues.com)', 'Jabong (www.jabong.com)',
  'Flipkart (www.flipkart.com)', 'Voonik (www.voonik.com)', 'SnapDeal (www.snapdeal.com)', 'Myntra (www.myntra.com)',
   'PaytmMall (www.paytmmall.com)',  'Mr.Voonik (www.voonik.com)',  'Wooplr (www.wooplr.com)',  'Koovs (www.koovs.com)',
 ];
  b2cInternational = ['Amazon US (www.amazon.com)', 'Amazon UK (www.amazon.co.uk)',
  'Cbazaar (www.cbazaar.com)', 'Amazon Australia (www.amazon.com.au)',
   'Ebay (www.ebay.com)',  'Utsav (www.utsavfashion.com)'];
  socialmedia = ['Facebook ', 'Google' , 'WhatsApp', 'Blog'];
  services = [
    { id: 0, name: 'B2C National' },
    { id: 1, name: 'B2C International' },
    { id: 2, name: 'B2B National' },
    { id: 3, name: 'B2B International' }
  ];
  showb2bNational: boolean;
  showb2cNational: boolean;
  showb2bInternational: boolean;
  showb2cInternational: boolean;
  showSocialMedia: boolean;
  platForms = [];
  selectedb2bNational = [];
  selectedb2cNational = [];
  selectedb2bInterNational = [];
  selectedb2cInterNational = [];
  selectedSocialMedia = [];
  bookingId;
  email;
  mailId;
  swPush: SwPush;
  selectedService;
  selected = 'b2cNationalValue';
  readonly VAPID_PUBLIC_KEY = 'BEe66AvTCe_qowysFNV2QsGWzgEDnUWAJq1ytVSXxtwqjcf0bnc6d5USXmZOnIu6glj1BFcj87jIR5eqF2WJFEY';
  constructor(private fb: FormBuilder, private router: Router,
    private digitalService: DigitalMgmtService, private localStorageService: LocalStorageService, public snackBar: MatSnackBar,
    private swUpdate: SwUpdate, private dashboardService: DashBoardService) { }

  ngOnInit() {
    this.dashboardService.makeMenuTransparent();
    this.createForm();
    this.checkData();
    this.showb2cNational = true;
    this.onSelect(this.services[0]);
  }
  createForm() {
    this.digitalMgmtForm = this.fb.group({
      mobileNumber: ['', mobileNumber],
      name: [''],
      location: [''],
      productDescription: [''],
      qtyDescription: [''],
      platformType: [''],
      b2bNat: [''],
      b2cNat: [''],
      b2bInter: [''],
      b2cInter: [''],
      socialMedia: [''],
      emailId: [''],
      websiteName: ['']
    });
  }
 /*  test() {
    this.dashBoard.showDashBoard();
  } */

  checkData() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.userName = this.localStorageService.retrieve('name');
    this.locat = this.localStorageService.retrieve('location');
    this.email = this.localStorageService.retrieve('emailId');
  }
  onSelect(service)   {
    switch (service.id) {
    case 0: {
      this.viewb2cNational();
      break;
    }
    case 1: {
      this.viewb2cInterNational();
      break;
    }
    case 2: {
      this.viewb2bNational();
      break;
    }
    case 3: {
      this.viewb2bInterNational();
      break;
    }
  }
  this.selectedService = service;
  }

  viewb2bNational() {
    this.showb2bNational = true;
    this.showb2bInternational = false;
    this.showb2cNational = false;
    this.showb2cInternational = false;
    this.showSocialMedia = false;
  }
  viewb2bInterNational() {
    this.showb2bNational = false;
    this.showb2bInternational = true;
    this.showb2cNational = false;
    this.showb2cInternational = false;
    this.showSocialMedia = false;
  }
  viewb2cNational() {
    this.showb2bNational = false;
    this.showb2bInternational = false;
    this.showb2cNational = true;
    this.showb2cInternational = false;
    this.showSocialMedia = false;
  }
  viewb2cInterNational() {
    this.showb2bNational = false;
    this.showb2bInternational = false;
    this.showb2cNational = false;
    this.showb2cInternational = true;
    this.showSocialMedia = false;
  }
  viewSocialMedia() {
    this.showb2bNational = false;
    this.showb2bInternational = false;
    this.showb2cNational = false;
    this.showb2cInternational = false;
    this.showSocialMedia = true;
  }
  getB2bNationalValue(catalogListingForm: FormGroup, b2bnat, isChecked) {
    const b2bindex = this.selectedb2bNational.indexOf(b2bnat);
    if (isChecked) {
      this.selectedb2bNational.push(b2bnat);
    } else if (b2bindex > -1) {
      this.selectedb2bNational.splice(b2bindex, 1);
    }
  }

  getB2cNationalValue(catalogListingForm, b2cnat, isChecked) {
    const b2cindex = this.selectedb2cNational.indexOf(b2cnat);
    if (isChecked) {
      this.selectedb2cNational.push(b2cnat);
    } else if (b2cindex > -1) {
      this.selectedb2cNational.splice(b2cindex, 1);
    }
    console.log(this.selectedb2cNational);
  }
  getB2bInterNationalValue(catalogListingForm, b2binternat, isChecked) {
    const b2bInterindex = this.selectedb2bInterNational.indexOf(b2binternat);
    if (isChecked) {
      this.selectedb2bInterNational.push(b2binternat);
    } else if (b2bInterindex > -1) {
      this.selectedb2bInterNational.splice(b2bInterindex, 1);
    }
    console.log(this.selectedb2bInterNational);
  }
  getB2cInterNationalValue(catalogListingForm, b2cinternat, isChecked) {
    const b2cInterindex = this.selectedb2cInterNational.indexOf(b2cinternat);
    if (isChecked) {
      this.selectedb2cInterNational.push(b2cinternat);
    } else if (b2cInterindex > -1) {
      this.selectedb2cInterNational.splice(b2cInterindex, 1);
    }
    console.log(this.selectedb2cInterNational);
  }
  getSocialMediaValue(catalogListingForm, socialMedia, isChecked) {
    const socialMediaindex = this.selectedSocialMedia.indexOf(socialMedia);
    if (isChecked) {
      this.selectedSocialMedia.push(socialMedia);
    } else if (socialMediaindex > -1) {
      this.selectedSocialMedia.splice(socialMediaindex, 1);
    }
    console.log(this.selectedSocialMedia);
  }
  booking(digitalMgmtForm: FormGroup) {
    this.message = 'Account Management Booking Done';
    this.action = 'booked';
    this.addMobileNo = digitalMgmtForm.controls.mobileNumber.value;
    this.addUserName = digitalMgmtForm.controls.name.value;
    this.addLocation = digitalMgmtForm.controls.location.value;
    this.mailId = digitalMgmtForm.controls.emailId.value;
    this.localStorageService.store('mobileno', this.addMobileNo);
    this.localStorageService.store('name', this.addUserName);
    this.localStorageService.store('location', this.addLocation);
    this.localStorageService.store('emailId', this.mailId);
    this.digitalModel = new DigitalMgmtBooking(
      digitalMgmtForm.controls.mobileNumber.value,
      digitalMgmtForm.controls.name.value,
      digitalMgmtForm.controls.location.value,
      digitalMgmtForm.controls.emailId.value
    );
    this.digitalModel.b2bNational = this.selectedb2bNational;
    this.digitalModel.b2bInterNational = this.selectedb2bInterNational;
    this.digitalModel.b2cNational = this.selectedb2cNational;
    this.digitalModel.b2cInterNational = this.selectedb2cInterNational;
    this.digitalModel.socialMedia = this.selectedSocialMedia;
    this.digitalModel.website = this.digitalMgmtForm.controls.websiteName.value;
    this.digitalService.digitalBooking(this.digitalModel).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
     this.router.navigate(['/dashboard/status', data.bookingOrderId]);
    }, error => {
      console.log(error);
    });
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.saveCustomerDetail(digitalMgmtForm);
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
        this.digitalService.addPushSubscriber(this.notificationModel).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
  saveCustomerDetail(digitalMgmtForm: FormGroup) {
    this.customer = new Customer(
      digitalMgmtForm.controls.mobileNumber.value,
      digitalMgmtForm.controls.name.value,
      digitalMgmtForm.controls.location.value,
      digitalMgmtForm.controls.emailId.value
    );
    this.customer.bookingType = 'Account Management Booking';
    this.digitalService.addCustomerDetail(this.customer).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}
