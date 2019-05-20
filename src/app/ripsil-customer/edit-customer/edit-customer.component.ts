import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { RipsilCustomerService } from '../ripsil-customer.service';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { element } from 'protractor';
import { Notification } from '../../shared/notification.model';
import { LocalStorageService } from 'ngx-webstorage';
import { CustomerLogIn } from '../../shared/customer-login.model';
import { mobileNumber } from '../../shared/validation';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customerloginForm: FormGroup;
  id: string;
  customerValue: any;
  storedMobileNo: any;
  firstValue: any;
  constructor(private fb: FormBuilder, private ripsilCustomerService: RipsilCustomerService,
    private router: Router, public snackBar: MatSnackBar, private swUpdate: SwUpdate, private route : ActivatedRoute,
    private localStorageService: LocalStorageService, private swPush: SwPush,
    @Inject(MAT_DIALOG_DATA) public data) {
      /* this.route.paramMap.subscribe(
        (params: ParamMap) => {
          this.id = params.get('id');
        }); */
     }

  createViewForm() {
    this.customerloginForm = this.fb.group({
      mobileNumber: [/* {value: '', disabled: true}, */'', mobileNumber],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.createViewForm();
    this.getMobileNumber();
    this.getSelectedCustomer();
  }
  getSelectedCustomer() {
   /*  this.customerValue = new CustomerLogIn();
    this.customerValue.mobileNumber = this.storedMobileNo; */
    this.ripsilCustomerService.getSelectedCustomer(this.storedMobileNo).subscribe(data => {
      this.customerValue = data;
      /* this.firstValue = this.customerValue._body; */
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  getMobileNumber() {
    this.storedMobileNo = this.localStorageService.retrieve('mobileNumber');
    /* console.log(this.storedMobileNo); */
  }
  update(mob, pass) {
    this.firstValue = new CustomerLogIn();
    this.firstValue.mobileNumber = mob;
    this.firstValue.password = pass;
     this.ripsilCustomerService.updateclustomerdetails(this.firstValue).subscribe(data => {
       this.customerValue = data;
       this.snackBar.open('Password changed successfully', 'OK', { duration: 3000, panelClass: ['blue-snackbar'] });
       this.localStorageService.clear('mobileNumber');
       this.localStorageService.store('userLoggedIn', 'false');
       this.router.navigate(['/login']);
     }, error => {
       console.log(error);
     });
  }
  back() {
    this.router.navigate(['/acitivitylog']);
  }

}
