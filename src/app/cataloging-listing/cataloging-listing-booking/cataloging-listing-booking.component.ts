import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import {MatSnackBar} from '@angular/material';
import { SwPush, SwUpdate } from '@angular/service-worker';

import { CatalogListingService } from '../catalog-listing.service';
import { mobileNumber } from '../../shared/validation';
import { CatalogBooking } from './catalog-booking.model';
import {DashBoardService} from '../../home/dashboard/dashboard.service';
import {DashboardComponent} from '../../home/dashboard/dashboard.component';
import { Notification } from '../../shared/notification.model';
import {Customer} from '../../shared/customer.model';



@Component({
  providers: [DashboardComponent],
  selector: 'app-cataloging-listing-booking',
  templateUrl: './cataloging-listing-booking.component.html',
  styleUrls: ['./cataloging-listing-booking.component.css']
})
export class CatalogingListingBookingComponent implements OnInit {
  message;
  action;
  catalogListingForm: FormGroup;
  notificationModel: Notification;
  userName: string;
  mobileNo: number;
  locat: string;
  customer: Customer;
  addMobileNo: number;
  addUserName: string;
  addLocation: string;
  catalogModel: CatalogBooking;
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
  socialmedia = ['Facebook', 'Google' , 'WhatsApp'];
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
  selectedService;
  services = [
    { id: 0, name: 'B2C National' },
    { id: 1, name: 'B2C International' },
    { id: 2, name: 'B2B National' },
    { id: 3, name: 'B2B International' },
    { id: 4, name: 'SocialMedia' },
  ];
  swPush: SwPush;
  selected = 'b2cNationalValue';
  readonly VAPID_PUBLIC_KEY = 'BEe66AvTCe_qowysFNV2QsGWzgEDnUWAJq1ytVSXxtwqjcf0bnc6d5USXmZOnIu6glj1BFcj87jIR5eqF2WJFEY';
  constructor(private fb: FormBuilder, private router: Router,
    private catalogService: CatalogListingService, private localStorageService: LocalStorageService, public snackBar: MatSnackBar,
    private swUpdate: SwUpdate, private dashBoardService: DashBoardService, private dashBoard: DashboardComponent) { }

  ngOnInit() {
    this.dashBoardService.makeMenuTransparent();
    this.createForm();
    this.checkData();
    this.showb2cNational = true;
    this.onSelect(this.services[0]);
    this.dashBoardService.generateTags({
      title: 'welcome',
      description: 'welcome',
      url: 'https://rinteger.com/',
      image: 'https://rinteger.com/admin/images/SP_sprinteger_models/Akash Model/1.jpg',
    });
  }
  createForm() {
    this.catalogListingForm = this.fb.group({
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
      emailId: ['']
    });
  }
 /*  test() {
    this.dashBoard.showDashBoard();
  } */

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
    case 4: {
      this.viewSocialMedia();
      break;
    }
  }
  this.selectedService = service;
  }
  checkData() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.userName = this.localStorageService.retrieve('name');
    this.locat = this.localStorageService.retrieve('location');
    this.email = this.localStorageService.retrieve('emailId');
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
  booking(catalogListingForm: FormGroup) {
    this.message = 'Cataloging / Listing  Booking Done';
    this.action = 'booked';
    this.addMobileNo = catalogListingForm.controls.mobileNumber.value;
    this.addUserName = catalogListingForm.controls.name.value;
    this.addLocation = catalogListingForm.controls.location.value;
    this.mailId = catalogListingForm.controls.emailId.value;
    this.localStorageService.store('mobileno', this.addMobileNo);
    this.localStorageService.store('name', this.addUserName);
    this.localStorageService.store('location', this.addLocation);
    this.localStorageService.store('emailId', this.mailId);
    this.catalogModel = new CatalogBooking(
      catalogListingForm.controls.mobileNumber.value,
      catalogListingForm.controls.name.value,
      catalogListingForm.controls.location.value,
      catalogListingForm.controls.emailId.value,
      catalogListingForm.controls.productDescription.value,
      catalogListingForm.controls.qtyDescription.value,
    );
    this.catalogModel.b2bNational = this.selectedb2bNational;
    this.catalogModel.b2bInterNational = this.selectedb2bInterNational;
    this.catalogModel.b2cNational = this.selectedb2cNational;
    this.catalogModel.b2cInterNational = this.selectedb2cInterNational;
    this.catalogModel.socialMedia = this.selectedSocialMedia;
    this.catalogService.catalogBooking(this.catalogModel).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
     this.router.navigate(['/dashboard/status', data.bookingOrderId]);
    }, error => {
      console.log(error);
    });
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.saveCustomerDetail(catalogListingForm);
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
        this.catalogService.addPushSubscriber(this.notificationModel).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
  saveCustomerDetail(catalogListingForm: FormGroup) {
    this.customer = new Customer(
      catalogListingForm.controls.mobileNumber.value,
      catalogListingForm.controls.name.value,
      catalogListingForm.controls.location.value,
      catalogListingForm.controls.emailId.value
    );
    this.customer.bookingType = 'Catalog Booking';
    this.catalogService.addCustomerDetail(this.customer).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

}
