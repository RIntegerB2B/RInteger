import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import {MatSnackBar} from '@angular/material';

import { CatalogListingService } from '../catalog-listing.service';
import { mobileNumber } from './validation';
import { CatalogBooking } from './catalog-booking.model';
import {DashBoardService} from '../../home/dashboard/dashboard.service';
import {DashboardComponent} from '../../home/dashboard/dashboard.component';



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
  userName: string;
  mobileNo: number;
  locat: string;
  addMobileNo: number;
  addUserName: string;
  addLocation: string;
  catalogModel: CatalogBooking;
  platFormType = ['B2BNational', 'B2BInternational', 'B2CNational', 'B2CInternational', 'SocialMedia'];
  b2bNational = ['Alibaba', 'Amazon', 'Meesho', 'Reliance', 'Udaan', 'WholesaleBox'];
  b2bInternational = ['Alibaba'];
  b2cNational = ['Amazon', 'Flipkart', 'Jabong', 'LimeRoad', 'Mr.Voonik', 'Myntra', 'Paytm', 'Shopclues', 'Voonik'];
  b2cInternational = ['Amazon.com',  'Cbazaar', 'Utsav'];
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
  constructor(private fb: FormBuilder, private router: Router,
    private catalogService: CatalogListingService, private localStorageService: LocalStorageService, public snackBar: MatSnackBar,
  private dashboardService: DashBoardService, private dashBoard: DashboardComponent) { }

  ngOnInit() {
    this.dashboardService.makeMenuTransparent();
    this.createForm();
    this.checkData();
    this.showb2cNational = true;
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

    });
  }
 /*  test() {
    this.dashBoard.showDashBoard();
  } */

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
    this.localStorageService.store('mobileno', this.addMobileNo);
    this.localStorageService.store('name', this.addUserName);
    this.localStorageService.store('location', this.addLocation);
    this.catalogModel = new CatalogBooking(
      catalogListingForm.controls.mobileNumber.value,
      catalogListingForm.controls.name.value,
      catalogListingForm.controls.location.value,
      catalogListingForm.controls.productDescription.value,
      catalogListingForm.controls.qtyDescription.value,
    );
    this.catalogModel.b2bNational = this.selectedb2bNational;
    this.catalogModel.b2bInterNational = this.selectedb2bInterNational;
    this.catalogModel.b2cNational = this.selectedb2cNational;
    this.catalogModel.b2cInterNational = this.selectedb2cInterNational;
    this.catalogModel.socialMedia = this.selectedSocialMedia;
    this.catalogService.catalogBooking(this.catalogModel).subscribe(data => {
     this.router.navigate(['/status', data.bookingOrderId]);
    }, error => {
      console.log(error);
    });
    this.snackBar.open(this.message, this.action, {
      duration: 2000,
    });
  }

}
