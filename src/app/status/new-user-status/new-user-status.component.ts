import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import {StatusService} from '../status.service';
import {StatusDetails} from './status.model';

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
  hideStatus: boolean;

  constructor(private fb: FormBuilder, private router: Router,
    private statusService: StatusService, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.newUserForm = this.fb.group({
      mobileNumber: ['', Validators.required],
      name: ['', Validators.required],
      order: []
    });
  }
  findStatus(newUserForm: FormGroup,  mobileNum: any, name: any) {
    this.localStorageService.store('mobileno', mobileNum);
    this.localStorageService.store('name', name);
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
    this.statusService.getStatusById(this.mobileNo, id).subscribe(data => {
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
   
     }
}
