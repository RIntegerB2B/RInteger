import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Booking } from './booking.model';
import {BookingService } from '../booking.service';
import { BookingId} from './bookingId.model';
import {mobileNumber} from './validation';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  onBookInForm: FormGroup;
  userBook: Booking ;
  id: BookingId;
  modelTypes = ['National', 'InterNational'];
  userName: string;
  mobileNo: string;
  hideMobileNo: boolean;
  constructor(private fb: FormBuilder, private router: Router,
    private bookingService: BookingService, private localStorageService: LocalStorageService ) { }

  ngOnInit() {
    this.createForm();
     this.checkData();
  }

  createForm() {
    this.onBookInForm = this.fb.group({
      mobileNumber: ['', Validators.required],
      name: ['', Validators.required],
      productDescription: ['', Validators.required],
      quantityDescription: ['', Validators.required],
      shootType: new FormControl(''),
      modelType: [''],
      rememberMe: ['']

    });
  }
  bookSubmit(onBookInForm: FormGroup) {
    this.userBook = new Booking(
      onBookInForm.controls.name.value,
      onBookInForm.controls.mobileNumber.value,
      onBookInForm.controls.productDescription.value,
      onBookInForm.controls.quantityDescription.value,
      onBookInForm.controls.shootType.value,
      onBookInForm.controls.modelType.value,
    );
    this.onBookInForm.reset();
    this.bookingService.addBooking(this.userBook).subscribe(data => {
this.id = data;
this.router.navigate(['/status', this.id._id]);
    }, error => {
      console.log(error);
    });
  }



  saveData(onBookInForm: FormGroup, mobileNum: any, name: any) {
    this.localStorageService.store('mobileno', mobileNum);
    this.localStorageService.store('name', name);
  }

  checkData() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.userName = this.localStorageService.retrieve('name');
  }
}
