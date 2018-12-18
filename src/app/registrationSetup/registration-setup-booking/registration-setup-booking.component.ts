import { Component, OnInit , Inject, Injector} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import {MatSnackBar} from '@angular/material';

import { mobileNumber } from '../../shared/validation';
import { RegistrationBooking } from './registrationSetup.model';
import { RegistrationSetupService } from '../registration-setup.service';
import {DashBoardService} from '../../home/dashboard/dashboard.service';
import { SwPush, SwUpdate } from '@angular/service-worker';
import {Notification} from '../../shared/notification.model';
import {Customer} from '../../shared/customer.model';

@Component({
  selector: 'app-registration-setup-booking',
  templateUrl: './registration-setup-booking.component.html',
  styleUrls: ['./registration-setup-booking.component.css']
})
export class RegistrationSetupBookingComponent implements OnInit {
  message;
  action;
  registrationBookingForm: FormGroup;
  userName: string;
  mobileNo: number;
  locat: string;
  addMobileNo: number;
  addUserName: string;
  addLocation: string;
  customer: Customer;
  registrationBooking: RegistrationBooking;
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
  socialmedia = ['Facebook',  'Google' , 'Pintrest', 'Instagram', 'WhatsApp', 'Twitter'];
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
  mailId;
  email;
  selected = 'b2bNationalValue';
  selectedService;
  services = [
    { id: 0, name: 'B2B National' },
    { id: 1, name: 'B2B International' },
    { id: 2, name: 'B2C National' },
    { id: 3, name: 'B2C International' },
    { id: 4, name: 'Social Media' }
  ];
  notificationModel: Notification;
  swPush: SwPush;
  username;
  readonly VAPID_PUBLIC_KEY = 'BEe66AvTCe_qowysFNV2QsGWzgEDnUWAJq1ytVSXxtwqjcf0bnc6d5USXmZOnIu6glj1BFcj87jIR5eqF2WJFEY';

  constructor( private fb: FormBuilder, private router: Router,
    private registrationService: RegistrationSetupService, private localStorageService: LocalStorageService, private swUpdate: SwUpdate,
    public snackBar: MatSnackBar, private injector: Injector, private dashBoardService: DashBoardService) {
      try {
        this.swPush = this.injector.get(SwPush);
      } catch (error) {
        console.log(error);
      }
     }

  ngOnInit() {
    this.dashBoardService.makeMenuTransparent();
    this.createForm();
    this.checkData();
    this.onSelect(this.services[0]);
    this.showb2bNational = true;
  }
  createForm() {
    this.registrationBookingForm = this.fb.group({
      mobileNumber: ['', mobileNumber],
      name: [''],
      location: [''],
      platformType: [''],
      b2bNat: [''],
      b2cNat: [''],
      b2bInter: [''],
      b2cInter: [''],
      socialMedia: [''],
      emailId: ['']
    });
  }

  checkData() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.userName = this.localStorageService.retrieve('name');
    this.locat = this.localStorageService.retrieve('location');
    this.email = this.localStorageService.retrieve('emailId');
  }

  onSelect(service)   {
    switch (service.id) {
    case 0: {
      this.viewb2bNational();
      break;
    }
    case 1: {
      this.viewb2bInterNational();
      break;
    }
    case 2: {
      this.viewb2cNational();
      break;
    }
    case 3: {
      this.viewb2cInterNational();
      break;
    }
    case 4: {
      this.viewSocialMedia();
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


  getB2bNationalValue(registrationBooking: FormGroup, b2bnat, isChecked) {
    const b2bindex = this.selectedb2bNational.indexOf(b2bnat);
    if (isChecked) {
      this.selectedb2bNational.push(b2bnat);
    } else if (b2bindex > -1) {
      this.selectedb2bNational.splice(b2bindex, 1);
    }
  }

  getB2cNationalValue(registrationBooking, b2cnat, isChecked) {
    const b2cindex = this.selectedb2cNational.indexOf(b2cnat);
    if (isChecked) {
      this.selectedb2cNational.push(b2cnat);
    } else if (b2cindex > -1) {
      this.selectedb2cNational.splice(b2cindex, 1);
    }
    console.log(this.selectedb2cNational);
  }
  getB2bInterNationalValue(registrationBooking, b2binternat, isChecked) {
    const b2bInterindex = this.selectedb2bInterNational.indexOf(b2binternat);
    if (isChecked) {
      this.selectedb2bInterNational.push(b2binternat);
    } else if (b2bInterindex > -1) {
      this.selectedb2bInterNational.splice(b2bInterindex, 1);
    }
    console.log(this.selectedb2bInterNational);
  }
  getB2cInterNationalValue(registrationBooking, b2cinternat, isChecked) {
    const b2cInterindex = this.selectedb2cInterNational.indexOf(b2cinternat);
    if (isChecked) {
      this.selectedb2cInterNational.push(b2cinternat);
    } else if (b2cInterindex > -1) {
      this.selectedb2cInterNational.splice(b2cInterindex, 1);
    }
    console.log(this.selectedb2cInterNational);
  }
  getSocialMediaValue(registrationBooking, socialMedia, isChecked) {
    const socialMediaindex = this.selectedSocialMedia.indexOf(socialMedia);
    if (isChecked) {
      this.selectedSocialMedia.push(socialMedia);
    } else if (socialMediaindex > -1) {
      this.selectedSocialMedia.splice(socialMediaindex, 1);
    }
    console.log(this.selectedSocialMedia);
  }
  booking(registrationBooking: FormGroup) {
    this.message = 'Registration & Setup Booking Done';
    this.action = 'booked';
    this.addMobileNo = registrationBooking.controls.mobileNumber.value;
    this.addUserName = registrationBooking.controls.name.value;
    this.addLocation = registrationBooking.controls.location.value;
    this.localStorageService.store('mobileno', this.addMobileNo);
    this.localStorageService.store('name', this.addUserName);
    this.localStorageService.store('location', this.addLocation);
    this.localStorageService.store('emailId', this.email);
    this.registrationBooking = new RegistrationBooking(
      registrationBooking.controls.mobileNumber.value,
      registrationBooking.controls.name.value,
      registrationBooking.controls.location.value,
      registrationBooking.controls.emailId.value
    );
    this.registrationBooking.b2bNational = this.selectedb2bNational;
    this.registrationBooking.b2bInterNational = this.selectedb2bInterNational;
    this.registrationBooking.b2cNational = this.selectedb2cNational;
    this.registrationBooking.b2cInterNational = this.selectedb2cInterNational;
    this.registrationBooking.socialMedia = this.selectedSocialMedia;
    this.registrationService.registrationBooking(this.registrationBooking).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.router.navigate(['/dashboard/status', data.bookingOrderId]);

    }, error => {
      console.log(error);
    });
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.username = this.localStorageService.retrieve('name');
    this.saveCustomerDetail(registrationBooking);
    this.subscribe(this.mobileNo, this.username);
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
        this.registrationService.addPushSubscriber(this.notificationModel).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
  saveCustomerDetail(registrationBooking: FormGroup) {
    this.customer = new Customer(
      registrationBooking.controls.mobileNumber.value,
      registrationBooking.controls.name.value,
      registrationBooking.controls.location.value,
      registrationBooking.controls.emailId.value
    );
    this.customer.bookingType = 'Registration Booking';
    this.registrationService.addCustomerDetail(this.customer).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}
