<<<<<<< HEAD
import {Component, OnInit, Inject, ViewChild } from '@angular/core';
=======
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
>>>>>>> 1847400a3c4d926e0a7a415dffe48e2041028ac7
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';

import {StatusService} from '../status.service';
import {DashBoardService} from '../../home/dashboard/dashboard.service';
import {CompletedBookings} from './completed-order.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-completed-order',
  templateUrl: './completed-order.component.html',
  styleUrls: ['./completed-order.component.css']
})
export class CompletedOrderComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  no: string;
  // statusDisplay: string;
  Details: CompletedBookings;
orders;
  statusViewForm: FormGroup;
  progress: boolean;
  completed: boolean;
  displayStatus: boolean;
  materialPicked: boolean;
  materialPickedTrue: boolean;
  materialPickedProgress: boolean;
  shootCompleted: boolean;
  shootCompletedTrue: boolean;
  shootCompletedProgress: boolean;
  imageEditing: boolean;
  imageEditingTrue: boolean;
  imageEditingProgress: boolean;
  delivery: boolean;
  deliveryTrue: boolean;
  deliveryProgress: boolean;
  payment: boolean;
  paymentTrue: boolean;
  paymentProgress: boolean;
  materialReturn: boolean;
  materialReturnTrue: boolean;
  materialReturnProgress: boolean;
  hideStatus: boolean;
 bookingStatusApproved: boolean;
 bookingStatusWaiting: boolean;
 bookingStatusCompleted: boolean;
 bookingCancelled: boolean;
 message: boolean;
 datacheck;
 cancelledStatus: boolean;
 activeStatus: boolean;
 mobileNo;
filterOption = ['Model Booking', 'Product Booking', 'Catalog Booking', 'Registration Booking', 'Editing Booking',
'Marketing  Booking', 'Creative Booking', 'A+ Cataloging Booking', 'IT Services Booking', 'Account Management Booking',
'Scheduled Model Booking'];
 searchText: string;
<<<<<<< HEAD
 public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  dataSource: any = [];
  array: any;
  temp: any = [];
  constructor(private fb: FormBuilder,
=======
  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private fb: FormBuilder,
>>>>>>> 1847400a3c4d926e0a7a415dffe48e2041028ac7
    private activatedRoute: ActivatedRoute, private statusService: StatusService , private localStorageService: LocalStorageService,
    private dashBoardService: DashBoardService) {
     }

  ngOnInit() {
    this.dashBoardService.makeMenuTransparent();
    this.createForm();
 this.completedBooking();
  }

  createForm() {
    this.statusViewForm = this.fb.group({
      order: [''],
      bookingType: [''],
      filterText: [],
      test: []
    });
  }
  showStatus() {
    this.hideStatus = false;
    this.displayStatus = false;
    this.message = false;
  }
  bookingType(value) {
    if (value === 'All') {
      this.searchText = 'Booking';
    } else {
      this.searchText = value;
    }
    console.log(value);
  }
  filterType(value) {
    console.log( this.datacheck);
  }
  statusDetail(num, type) {
    this.statusService.getBookingDetail(num, type).subscribe(statusData => {
      this.Details = statusData;
         }, error => {
           console.log(error);
         });
  }
  handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }
  completedBooking() {

         this.mobileNo = this.localStorageService.retrieve('mobileno');

         this.statusService.getCancelledBookings(this.mobileNo)
         .subscribe((response) => {
           this.dataSource = new MatTableDataSource<Element>(response);
           this.dataSource.paginator = this.paginator;
           this.array = response;
           this.Details = response;
           this.totalSize = this.array.length;
           this.temp = response;
           this.iterator();
         }, error => {
           console.log(error);
         });
  }

}
