import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {StatusService} from '../status.service';
import { StatusView } from './status-view.model';
import {StatusDetail } from './status-detail.model';
import {BookingDetail} from './booking-detail.model';
import { element } from 'protractor';
import {DashBoardService} from '../../home/dashboard/dashboard.service';

@Component({
  selector: 'app-stauts-view',
  templateUrl: './stauts-view.component.html',
  styleUrls: ['./stauts-view.component.css']
})
export class StautsViewComponent implements OnInit {
  no: string;
  // statusDisplay: string;
orders;
 StatusForOne: StatusDetail;
 Details: BookingDetail[] = [];
  Status: StatusView [] = [];
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

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute, private statusService: StatusService , private dashBoardService: DashBoardService) {
      this.no = this.activatedRoute.snapshot.paramMap.get('no');
     }

  ngOnInit() {
    this.dashBoardService.makeMenuTransparent();
    this.status(this.no);
    this.createForm();
    this.orderDisplay();
  }

  createForm() {
    this.statusViewForm = this.fb.group({
      order: [''],
      bookingType: ['']
    });
  }
  showStatus() {
    this.hideStatus = false;
    this.displayStatus = false;
    this.message = false;
  }
  statusView(statusViewForm: FormGroup, id: any, type: any) {
 this.statusService.getStatusById( this.no, id).subscribe(data => {
  this.StatusForOne = data;
  console.log(type);
  if (type === 'Direct Booking'  || type === 'Model Booking' ) {
    this.displayStatus = true;
    this.hideStatus = true;
    this.message = false;
  } else if (type === 'Catalog Booking'  || type === 'Marketing Booking' || type === 'Registration Booking' ) {
  this.message = true;
  this.displayStatus = false;
  this.hideStatus = true;
  }
 switch (data.materialPickedUp) {
    case 0: {
      this.materialPicked = true;
      this.materialPickedTrue = false;
      this.materialPickedProgress = false;
      break;
    }
    case 1: {
      this.materialPicked = false;
      this.materialPickedProgress = false;
      this.materialPickedTrue = true;
      break;
    }
    case 2: {
      this.materialPicked = false;
      this.materialPickedProgress = true;
      this.materialPickedTrue = false;
      break;
    }

  }

  switch (data.shootCompleted) {
    case 0: {
      this.shootCompleted = true;
      this.shootCompletedTrue = false;
      this.shootCompletedProgress = false;
      break;
    }
    case 1: {
      this.shootCompleted = false;
      this.shootCompletedProgress = false;
      this.shootCompletedTrue = true;
      break;
    }
    case 2: {
      this.shootCompleted = false;
      this.shootCompletedProgress = true;
      this.shootCompletedTrue = false ;
      break;
    }
  }

  switch (data.imageEditing) {
    case 0: {
      this.imageEditing = true;
      this.imageEditingTrue = false;
      this.imageEditingProgress = false;
      break;
    }
    case 1: {
      this.imageEditing = false;
      this.imageEditingProgress = false;
      this.imageEditingTrue = true;
      break;
    }
    case 2: {
      this.imageEditing = false;
      this.imageEditingProgress = true;
      this.imageEditingTrue = false;
      break;
    }
  }
  switch (data.delivery) {
    case 0: {
      this.delivery = true;
      this.deliveryTrue = false;
      this.deliveryProgress = false;
      break;
    }
    case 1: {
      this.deliveryTrue = true;
      this.delivery = false;
      this.deliveryProgress = false;
      break;
    }
    case 2: {
      this.deliveryTrue = false;
      this.delivery = false;
      this.deliveryProgress = true;
      break;
    }
  }
  switch (data.payment) {
    case 0: {
      this.payment = true;
      this.paymentTrue = false;
      this.paymentProgress = false;
      break;
    }
    case 1: {
      this.payment = false;
      this.paymentTrue = true;
      this.paymentProgress = false;
      break;
    }
    case 2: {
      this.payment = false;
      this.paymentTrue = false;
      this.paymentProgress = true;
      break;
    }
  }
  switch (data.materialReturn) {
    case 0: {
      this.materialReturnProgress = false;
      this.materialReturn = true;
      this.materialReturnTrue = false;
      break;
    }
    case 1: {
      this.materialReturnProgress = false;
      this.materialReturn = false;
      this.materialReturnTrue = true;
      break;
    }
    case 2: {
      this.materialReturnProgress = true;
      this.materialReturn = false;
      this.materialReturnTrue = false;
      break;
    }
  }
 },
  error => {
   console.log(error);
 }
);
this.bookingDetail(id, type) ;
  }

orderDisplay() {

}
  status(no) {
    this.statusService.getStatusByNum(no).subscribe(statusData => {
       this.Status = statusData;
          }, error => {
            console.log(error);
          });
  }
  bookingDetail(num, type) {
    this.statusService.getBookingDetail(num, type).subscribe(statusData => {
      this.Details = statusData;
         }, error => {
           console.log(error);
         });
  }
}
