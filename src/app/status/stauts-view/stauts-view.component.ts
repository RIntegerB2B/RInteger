import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {StatusService} from '../status.service';
import { StatusView } from './status-view.model';
import {StatusDetail } from './status-detail.model';
import {BookingDetail} from './booking-detail.model';
import { element } from 'protractor';

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

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute, private statusService: StatusService ) {
      this.no = this.activatedRoute.snapshot.paramMap.get('no');
     }

  ngOnInit() {
    this.status(this.no);
    this.createForm();
    this.orderDisplay();
  }

  createForm() {
    this.statusViewForm = this.fb.group({
      order: ['']
    });
  }
  showStatus() {
    this.hideStatus = false;
    this.displayStatus = false;
  }
  statusView(statusViewForm: FormGroup, id: any) {
    console.log(id);
 this.displayStatus = true;
 this.hideStatus = true;
 this.statusService.getStatusById( this.no, id).subscribe(data => {
  this.StatusForOne = data;

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
this.bookingDetail(id) ;
  }

orderDisplay() {

}
  status(no) {
    this.statusService.getStatusByNum(no).subscribe(statusData => {
       this.Status = statusData;
       statusData.forEach(function(elem) {
        console.log(elem.bookingStatus);
       switch (elem.bookingStatus) {
        case 0: {
          this.bookingStatusWaiting = true;
          this.bookingStatusApproved = false;
          this.bookingStatusCompleted = false;
          this.bookingCancelled = false;
          break;
        }
        case 1: {
          this.bookingStatusApproved = true;
          this.bookingStatusWaiting = false;
          this.bookingStatusCompleted = false;
          this.bookingCancelled = false;
          break;
        }
        case 2: {
          this.bookingCancelled = true;
          this.bookingStatusCompleted = false;
          this.bookingStatusApproved = false;
          this.bookingStatusWaiting = false;
          break;
        }
        case 3: {
          this.bookingStatusCompleted = true;
          this.bookingStatusApproved = false;
          this.bookingStatusWaiting = false;
          this.bookingCancelled = false;
          break;
        }
      }
    });
          }, error => {
            console.log(error);
          });
  }
  bookingDetail(num) {
    this.statusService.getBookingDetail(num).subscribe(statusData => {
      this.Details = statusData;
         }, error => {
           console.log(error);
         });
  }
}
