import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
=======
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
>>>>>>> eb327a5400d8d8995d23d7a0437bad35399f7c5c
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
<<<<<<< HEAD
      typeYourMessage: ['', Validators.required]
=======
      productDescription: ['', Validators.required]
>>>>>>> eb327a5400d8d8995d23d7a0437bad35399f7c5c
    });
  }
  sendSubmit(onSendInForm: FormGroup) {
    this.userSend = new Send(
      onSendInForm.controls.name.value,
      onSendInForm.controls.mobileNumber.value,
<<<<<<< HEAD
      onSendInForm.controls.typeYourMessage.value
=======
      onSendInForm.controls.productDescription.value
>>>>>>> eb327a5400d8d8995d23d7a0437bad35399f7c5c
    );
    this.onSendInForm.reset();
  }


}
