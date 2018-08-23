import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

import {StatusService} from '../status.service';
import {StatusDetails} from './status.model';
import {BookingDetails} from './booking-detail.model';
import {mobileNumber} from './validation';

@Component({
  selector: 'app-new-user-status',
  templateUrl: './new-user-status.component.html',
  styleUrls: ['./new-user-status.component.css']
})
export class NewUserStatusComponent implements OnInit {
  newUserForm: FormGroup;
  status: StatusDetails;
  show: Boolean;
  mobileNo;
  StatusForOne;
  progress: boolean;
  completed: boolean;
  displayStatus: boolean;
  materialPicked: boolean;
  materialPickedTrue: boolean;
  shootCompleted: boolean;
  shootCompletedTrue: boolean;
  imageEditing: boolean;
  imageEditingTrue: boolean;
  delivery: boolean;
  deliveryTrue: boolean;
  payment: boolean;
  paymentTrue: boolean;
  materialReturn: boolean;
  materialReturnTrue: boolean;
  materialPickedProgress: boolean;
  shootCompletedProgress: boolean;
 imageEditingProgress: boolean;
 deliveryProgress: boolean;
  paymentProgress: boolean;
 materialReturnProgress: boolean;
  hideStatus: boolean;
  Detail: BookingDetails[] = [];

  constructor(private fb: FormBuilder, private router: Router,
    private statusService: StatusService, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.newUserForm = this.fb.group({
      mobileNumber: ['', mobileNumber],
      name: ['', Validators.required],
      order: []
    });
  }
  findStatus(newUserForm: FormGroup,  mobileNum: any) {
    this.localStorageService.store('mobileno', mobileNum);
    this.statusService.getStatusByNum( mobileNum).subscribe(data => {
       this.status  = data;
      this.show = true;
      console.log(data);
     },
      error => {
       console.log(error);
     }
    );
  }
  showStatus() {
    this.hideStatus = false;
    this.displayStatus = false;
  }
  statusView(statusViewForm: FormGroup, id: any) {
    this.displayStatus = true;
    this.hideStatus = true;
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.statusService.getStatusById(  this.mobileNo, id).subscribe(data => {
      console.log(data);
     this.Detail = data;
     switch (data.order) {
       case 0: {
         this.progress = true;
         break;
       }
       case 1: {
         this.completed = true;
         break;
       }
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
         this.materialPickedTrue = true;
         this.materialPickedProgress = false;
         break;
       }
       case 2: {
        this.materialPicked = false;
        this.materialPickedTrue = false;
        this.materialPickedProgress = true;
        break;
      }
     }
     switch (data.shootCompleted) {
       case 0: {
         this.shootCompleted = true;
         this.shootCompletedProgress = false;
         this.shootCompletedTrue = false;
         break;
       }
       case 1: {
         this.shootCompleted = false;
         this.shootCompletedTrue = true;
         this.shootCompletedProgress = false;
         break;
       }
       case 2: {
        this.shootCompleted = false;
        this.shootCompletedTrue = false;
        this.shootCompletedProgress = true;
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
         this.imageEditingTrue = true;
         this.imageEditingProgress = false;
         break;
       }
       case 2: {
        this.imageEditing = false;
        this.imageEditingTrue = false;
        this.imageEditingProgress = true;
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
         this.materialReturn = true;
         this.materialReturnProgress = false;
         this.materialReturnTrue = false;
         break;
       }
       case 1: {
         this.materialReturn = false;
         this.materialReturnProgress = false;
         this.materialReturnTrue = true;
         break;
       }
       case 2: {
        this.materialReturn = false;
        this.materialReturnProgress = true;
        this.materialReturnTrue = false;
        break;
      }
     }
    },
     error => {
      console.log(error);
    }
   );
   this.bookingDetail(id);
     }
     bookingDetail(num) {
      console.log(num);
      this.statusService.getBookingDetail(num).subscribe(statusData => {
        this.Detail = statusData;
        console.log(this.Detail);
        console.log(statusData);
           }, error => {
             console.log(error);
           });
    }
}
