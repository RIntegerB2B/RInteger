import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import {StatusService} from '../status.service';
import { Status} from './status.model';
import {BookingStatus} from './bookingStatus.model';


@Component({
  selector: 'app-stauts',
  templateUrl: './stauts.component.html',
  styleUrls: ['./stauts.component.css']
})
export class StautsComponent implements OnInit {
  id: string;
  statusForm: FormGroup;
  status: Status[] = [];
  BookingStatus: BookingStatus [] = [];
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
 bookingStatusApproved: boolean;
 bookingStatusWaiting: boolean;
 bookingStatusCompleted: boolean;
 bookingCancelled: boolean;

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute, private statusService: StatusService ) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log( this.id);
  }

  ngOnInit() {
    this.findOrderStatus();
    this.createForm();
  }

 createForm() {
  this.statusForm = this.fb.group({
    order: ['']
  });
}
findOrderStatus() {
  this.statusService.getBookingStatus(this.id).subscribe(data => {
    // console.log(data);
    this.BookingStatus.push(data) ;
  // console.log(data.bookingStatus);
  switch (data.bookingStatus) {
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
      this.bookingStatusCompleted = true;
      this.bookingStatusApproved = false;
      this.bookingStatusWaiting = false;
      this.bookingCancelled = false;
      break;
    }
    case 3: {
      this.bookingCancelled = true;
      this.bookingStatusCompleted = false;
      this.bookingStatusApproved = false;
      this.bookingStatusWaiting = false;
      break;
    }
  }
  });
}

findStatus() {
  this.statusService.getStatus(this.id).subscribe(status => {
    this.status.push(status) ;
    switch (status.order) {
      case false: {
        this.progress = true;
        break;
      }
      case true: {
        this.completed = true;
        break;
      }
    }

    switch (status.materialPickedUp) {
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
    switch (status.shootCompleted) {
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
    switch (status.imageEditing) {
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
    switch (status.delivery) {
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
    switch (status.payment) {
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
    switch (status.materialReturn) {
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
          console.log( this.status);
        }, error => {
          console.log(error);
        });
      }

      statusView() {
        this.findStatus();
        this.displayStatus = true;
      }



}

