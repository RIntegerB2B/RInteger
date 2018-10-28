import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerQuery} from './contact.model';
import {ContactService} from './contact.service';
import {mobileNumber} from '../../shared/validation';
import {DashBoardService} from '../../home/dashboard/dashboard.service';
import { LocalStorageService } from 'ngx-webstorage';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  email: any;
  onSendInForm: FormGroup;
  userQuery: CustomerQuery ;
  userName;
  mobileNo;
  message;
  action;
  constructor(private fb: FormBuilder, private router: Router, private localStorageService: LocalStorageService,
    public snackBar: MatSnackBar,
    private contactService: ContactService,
    private dashboardService: DashBoardService ) { }

  ngOnInit() {
    this.dashboardService.hideMenuTransparent();
    this.createForm();
    this.checkData();
  }
  createForm() {
    this.onSendInForm = this.fb.group({
      mobileNumber: ['', mobileNumber ],
      name: ['', Validators.required],
      emailId: [''],
      typeYourMessage: ['']
    });
  }
  checkData() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.userName = this.localStorageService.retrieve('name');
    this.email = this.localStorageService.retrieve('emailId');
  }
  sendSubmit(onSendInForm: FormGroup) {
    this.message = 'RInteger Team will contact you shortly';
    this.userQuery = new CustomerQuery(
      onSendInForm.controls.name.value,
      onSendInForm.controls.mobileNumber.value,
      onSendInForm.controls.typeYourMessage.value
    );
    this.contactService.addQuery(this.userQuery).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
  this.onSendInForm.reset();
  this.router.navigate(['/welcome']);
  }

}
