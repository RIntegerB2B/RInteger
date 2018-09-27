import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import {MatSnackBar} from '@angular/material';

import {MarketingServicesService} from '../marketing-services.service';
import {MarketingServicesBooking} from './marketingServices.model';
import {mobileNumber} from './validation';
import {DashBoardService} from '../../home/dashboard/dashboard.service';


@Component({
  selector: 'app-marketing-services-booking',
  templateUrl: './marketing-services-booking.component.html',
  styleUrls: ['./marketing-services-booking.component.css']
})
export class MarketingServicesBookingComponent implements OnInit {
  message;
  action;
  marketingBookingForm: FormGroup;
  userName: string;
  mobileNo: number;
  locat: string;
  addMobileNo: number;
  addUserName: string;
  addLocation: string;
  marketingBooking: MarketingServicesBooking;
  selectedMedium = [];
  marketingServices = ['Bulk SMS', 'Bulk Email', 'Bulk WhatsApp', 'Google', 'Facebook' , 'Database Booking'];
  bookingId;

  constructor(private fb: FormBuilder, private router: Router,
    private marketingService: MarketingServicesService, private localStorageService: LocalStorageService,
    public snackBar: MatSnackBar , private dashBoardService: DashBoardService) { }
  ngOnInit() {
    this.dashBoardService.makeMenuTransparent();
    this.createForm();
    this.checkData();
  }
  createForm() {
    this.marketingBookingForm = this.fb.group({
      mobileNumber: ['', mobileNumber],
      name: [''],
      location: [''],
      marketing: [''],
    });
  }
  checkData() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.userName = this.localStorageService.retrieve('name');
    this.locat = this.localStorageService.retrieve('location');
  }
  getValue(marketingBookingForm, marketing, isChecked) {
    const marketingIndex = this.selectedMedium.indexOf(marketing);
    if (isChecked) {
      this.selectedMedium.push(marketing);
    } else if (marketingIndex > -1) {
      this.selectedMedium.splice(marketingIndex, 1);
    }
    console.log(this.selectedMedium);
  }
  booking(marketingBookingForm: FormGroup) {
    this.message = 'Marketing  Services  Booking Done';
    this.action = 'booked';
    this.addMobileNo = marketingBookingForm.controls.mobileNumber.value;
    this.addUserName = marketingBookingForm.controls.name.value;
    this.addLocation = marketingBookingForm.controls.location.value;
    this.localStorageService.store('mobileno', this.addMobileNo);
    this.localStorageService.store('name', this.addUserName);
    this.localStorageService.store('location', this.addLocation);
    this.marketingBooking = new MarketingServicesBooking(
      marketingBookingForm.controls.mobileNumber.value,
      marketingBookingForm.controls.name.value,
      marketingBookingForm.controls.location.value
    );
    this.marketingBooking.marketingMedium = this.selectedMedium;
    this.marketingService.marketingBooking(this.marketingBooking).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.router.navigate(['/status', data.bookingOrderId]);
    }, error => {
      console.log(error);
    });
  }
}
