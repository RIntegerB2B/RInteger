import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerQuery} from './contact.model';
import {ContactService} from './contact.service';
import {mobileNumber} from '../../booking/booking/validation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  onSendInForm: FormGroup;
  userQuery: CustomerQuery ;
  Name;
  mobileNo;
  constructor(private fb: FormBuilder, private router: Router, private contactService: ContactService ) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.onSendInForm = this.fb.group({
      mobileNumber: ['', mobileNumber ],
      name: ['', Validators.required],
      typeYourMessage: ['', Validators.required]
    });
  }
  sendSubmit(onSendInForm: FormGroup) {
    this.userQuery = new CustomerQuery(
      onSendInForm.controls.name.value,
      onSendInForm.controls.mobileNumber.value,
      onSendInForm.controls.typeYourMessage.value
    );
    this.contactService.addQuery(this.userQuery).subscribe(data => {
    }, error => {
      console.log(error);
    });
  this.onSendInForm.reset();
  }

}
