import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Send} from './contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  onSendInForm: FormGroup;
  userSend: Send ;

  constructor(private fb: FormBuilder, private router: Router ) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.onSendInForm = this.fb.group({
      mobileNumber: ['', Validators.required],
      name: ['', Validators.required],
      productDescription: ['', Validators.required]
    });
  }
  sendSubmit(onSendInForm: FormGroup) {
    this.userSend = new Send(
      onSendInForm.controls.name.value,
      onSendInForm.controls.mobileNumber.value,
      onSendInForm.controls.productDescription.value
    );
    this.onSendInForm.reset();
  }


}
