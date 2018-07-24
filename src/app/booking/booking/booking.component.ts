import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookIn } from './booking.model';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  onBookInForm: FormGroup;
  userBook: BookIn;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.bookForm();
  }

  bookForm() {
    this.onBookInForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      name: ['', Validators.required],
    });
  }
  
  bookSubmit(onBookInForm: FormGroup) {
    
    this.userBook = new BookIn(
      onBookInForm.controls.name.value,
      onBookInForm.controls.phoneNumber.value,
    );
    console.log(this.userBook);
  }
}
