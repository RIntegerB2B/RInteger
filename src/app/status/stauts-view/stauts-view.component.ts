import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {StatusService} from '../status.service';
import { StatusView } from './status-view.model';
import {StatusDetail } from './status-detail.model';
import {BookingDetail} from './booking-detail.model';

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
  hideStatus: boolean;

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute, private statusService: StatusService ) {
      this.no = this.activatedRoute.snapshot.paramMap.get('no');
      console.log(this.no);
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
    case false: {
      this.progress = true;
      break;
    }
    case true: {
      this.completed = true;
      break;
    }
  }

 switch (data.materialPickedUp) {
    case false: {
      this.materialPicked = true;
      this.materialPickedTrue = false;
      break;
    }
    case true: {
      this.materialPicked = false;
      this.materialPickedTrue = true;
      break;
    }

  }

  switch (data.shootCompleted) {
    case false: {
      this.shootCompleted = true;
      this.shootCompletedTrue = false;
      break;
    }
    case true: {
      this.shootCompleted = false;
      this.shootCompletedTrue = true;
      break;
    }
  }

  switch (data.imageEditing) {
    case false: {
      this.imageEditing = true;
      this.imageEditingTrue = false;
      break;
    }
    case true: {
      this.imageEditing = false;
      this.imageEditingTrue = true;
      break;
    }
  }
  switch (data.delivery) {
    case false: {
      this.delivery = true;
      this.deliveryTrue = false;
      break;
    }
    case true: {
      this.deliveryTrue = true;
      this.delivery = false;
      break;
    }
  }
  switch (data.payment) {
    case false: {
      this.payment = true;
      this.paymentTrue = false;
      break;
    }
    case true: {
      this.payment = false;
      this.paymentTrue = true;
      break;
    }
  }
  switch (data.materialReturn) {
    case false: {
      this.materialReturn = true;
      this.materialReturnTrue = false;
      break;
    }
    case true: {
      this.materialReturn = false;
      this.materialReturnTrue = true;
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
          }, error => {
            console.log(error);
          });
  }
  bookingDetail(num) {
    console.log(num);
    this.statusService.getBookingDetail(num).subscribe(statusData => {
      this.Details = statusData;
      console.log(this.Details);
      console.log(statusData);
         }, error => {
           console.log(error);
         });
  }
}
