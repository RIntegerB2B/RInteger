import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

import {CatalogListingService} from '../catalog-listing.service';
import {mobileNumber} from './validation';



@Component({
  selector: 'app-cataloging-listing-booking',
  templateUrl: './cataloging-listing-booking.component.html',
  styleUrls: ['./cataloging-listing-booking.component.css']
})
export class CatalogingListingBookingComponent implements OnInit {
  catalogListingForm: FormGroup;
  userName: string;
  mobileNo: number;
  locat: string;
  constructor(private fb: FormBuilder, private router: Router,
    private catalogService: CatalogListingService, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.createForm();
  }
createForm() {
  this.catalogListingForm = this.fb.group({
    mobileNumber: ['', mobileNumber],
    name: [''],
    location: [''],
    productDescription: [''],
    total: ['']
  });
}
}
