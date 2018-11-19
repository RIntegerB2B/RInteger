import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';

import {StatusService} from '../status.service';
import {CancelledBookingDetail} from './cancelled-booking.model';
import {DashBoardService} from '../../home/dashboard/dashboard.service';

@Component({
  selector: 'app-cancelled-status',
  templateUrl: './cancelled-status.component.html',
  styleUrls: ['./cancelled-status.component.css']
})
export class CancelledStatusComponent implements OnInit {
  no: string;
  // statusDisplay: string;
  Details: CancelledBookingDetail;
orders;
  statusViewForm: FormGroup;
  progress: boolean;
  completed: boolean;
  displayStatus: boolean;
  materialPicked: boolean;
  materialPickedTrue: boolean;
  materialPickedProgress: boolean;
  shootCompleted: boolean;
  shootCompletedTrue: boolean;
  shootCompletedProgress: boolean;
  imageEditing: boolean;
  imageEditingTrue: boolean;
  imageEditingProgress: boolean;
  delivery: boolean;
  deliveryTrue: boolean;
  deliveryProgress: boolean;
  payment: boolean;
  paymentTrue: boolean;
  paymentProgress: boolean;
  materialReturn: boolean;
  materialReturnTrue: boolean;
  materialReturnProgress: boolean;
  hideStatus: boolean;
 bookingStatusApproved: boolean;
 bookingStatusWaiting: boolean;
 bookingStatusCompleted: boolean;
 bookingCancelled: boolean;
 message: boolean;
 datacheck;
 cancelledStatus: boolean;
 activeStatus: boolean;
 mobileNo;
filterOption = ['Model Booking', 'Product Booking', 'Catalog Booking', 'Registration Booking', 'Editing Booking',
'Marketing  Booking', 'Creative Booking', 'A+ Cataloging Booking', 'IT Services Booking', 'Account Management Booking',
'Scheduled Model Booking'];
 searchText: string;
  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private fb: FormBuilder,
    private activatedRoute: ActivatedRoute, private statusService: StatusService , private localStorageService: LocalStorageService,
    private dashBoardService: DashBoardService) {
     }

  ngOnInit() {
    this.dashBoardService.makeMenuTransparent();
    this.createForm();
 this.cancelledBooking();
  }

  createForm() {
    this.statusViewForm = this.fb.group({
      order: [''],
      bookingType: [''],
      filterText: [],
      test: []
    });
  }
  showStatus() {
    this.hideStatus = false;
    this.displayStatus = false;
    this.message = false;
  }
  bookingType(value) {
    if (value === 'All') {
      this.searchText = 'Booking';
    } else {
      this.searchText = value;
    }
    console.log(value);
  }
  filterType(value) {
    console.log( this.datacheck);
  }
  statusDetail(num, type) {
    this.statusService.getBookingDetail(num, type).subscribe(statusData => {
      this.Details = statusData;
         }, error => {
           console.log(error);
         });
  }
  cancelledBooking() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
   console.log(this.mobileNo);
       this.statusService.getCancelledBookings(this.mobileNo).subscribe(statusData => {
      this.Details = statusData;
      console.log(this.Details);
         }, error => {
           console.log(error);
         });
  }

}
