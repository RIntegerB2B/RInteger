import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import {MatSnackBar} from '@angular/material';

import { mobileNumber } from './validation';
import { RegistrationBooking } from './registrationSetup.model';
import { RegistrationSetupService } from '../registration-setup.service';
import {DashBoardService} from '../../home/dashboard/dashboard.service';

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
  registrationBooking: RegistrationBooking;
  b2bNational = ['Alibaba', 'Amazon', 'Meesho', 'Reliance', 'Udaan', 'WholesaleBox'];
  b2bInternational = ['Alibaba'];
  b2cNational = ['Amazon', 'Flipkart', 'Jabong', 'LimeRoad', 'Mr.Voonik', 'Myntra', 'Paytm', 'Shopclues', 'Voonik'];
  b2cInternational = ['Amazon.com',  'Cbazaar', 'Utsav'];
  socialmedia = ['Facebook', 'Flikr', 'Google' , 'Instagram',  'Pintrest', 'Tumblr', 'Twitter', 'WhatsApp'];
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


  constructor(private fb: FormBuilder, private router: Router,
    private registrationService: RegistrationSetupService, private localStorageService: LocalStorageService,
    public snackBar: MatSnackBar, private dashBoardService: DashBoardService) { }

  ngOnInit() {
    this.dashBoardService.makeMenuTransparent();
    this.createForm();
    this.checkData();
    this.showb2cNational = true;
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
    });
  }

  checkData() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.userName = this.localStorageService.retrieve('name');
    this.locat = this.localStorageService.retrieve('location');
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
    this.registrationBooking = new RegistrationBooking(
      registrationBooking.controls.mobileNumber.value,
      registrationBooking.controls.name.value,
      registrationBooking.controls.location.value
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
      this.router.navigate(['/status', data.bookingOrderId]);

    }, error => {
      console.log(error);
    });
  }
}
