import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

import {ModelManagementService} from '../model-management.service';
import {ModelDetail} from './model.model';
import {ModelBooking} from './model-booking.model';

@Component({
  selector: 'app-model-based-booking',
  templateUrl: './model-based-booking.component.html',
  styleUrls: ['./model-based-booking.component.css']
})
export class ModelBasedBookingComponent implements OnInit {
id;
Model: ModelDetail[] = [];
bookModelForm: FormGroup;
userName: string;
mobileNo: number;
locat: string;
bookingModel: ModelBooking;
  constructor( private activatedRoute: ActivatedRoute, private fb: FormBuilder, private router: Router,
    private modelService: ModelManagementService, private localStorageService: LocalStorageService) {
       this.id = this.activatedRoute.snapshot.paramMap.get('modelId');
      }

  ngOnInit() {
    this.viewModel(this.id);
    this.createForm();
    this.checkData();
  }
  createForm() {
    this.bookModelForm = this.fb.group({
      name: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      location: ['', Validators.required],
      productDescription: [''],
      qtyDescription: [''],
      id: [''],
      modelsname: ['']
    });
  }
  checkData() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.userName = this.localStorageService.retrieve('name');
    this.locat = this.localStorageService.retrieve('location');
  }
viewModel(id) {
this.modelService.modelDetail(id).subscribe(data => {
  this.Model = data;
  console.log(data);
});
}
bookSubmit(bookModelForm: FormGroup , modelsId: any, modelNm: any) {
  this.mobileNo = bookModelForm.controls.mobileNumber.value;
  this.userName =  bookModelForm.controls.name.value;
  this.locat = bookModelForm.controls.location.value;
  this.localStorageService.store('mobileno', this.mobileNo);
  this.localStorageService.store('name', this.userName);
  this.localStorageService.store('location', this.locat);
  this.bookingModel = new ModelBooking(
    bookModelForm.controls.name.value,
    bookModelForm.controls.mobileNumber.value,
    bookModelForm.controls.location.value,
    bookModelForm.controls.productDescription.value,
    bookModelForm.controls.qtyDescription.value
  );
  this.bookingModel.modelId = modelsId;
  this.bookingModel.modelsName = modelNm;
 /*  this.saveCustomerDetail(bookModelForm); */
  this.bookModelForm.reset();
  this.modelService.addModelBooking(this.bookingModel).subscribe(data => {
    this.id = data;
    this.router.navigate(['/status', this.id._id]);
  }, error => {
    console.log(error);
  });
}
}
