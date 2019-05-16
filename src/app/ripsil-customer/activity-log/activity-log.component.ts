import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { CustomerLogIn } from '../../shared/customer-login.model';
import { RipsilCustomerService } from '../ripsil-customer.service';
import { error } from '@angular/compiler/src/util';
import { FormGroup } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  mobValue: any;
  holdData: any;
  filterOption = ['Studio', 'BSS', 'Technologies'];
  holdValue: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  dataSource: any;
  array: any;
  valueData;

  constructor(private localStorageService: LocalStorageService, private  ripsilCustomerService: RipsilCustomerService) { }
  ngOnInit() {
    this.getMobileNumber();
    this.getValueByMobileNumber();
  }
  getValueByMobileNumber() {
    this.holdData = new CustomerLogIn();
    this.holdData.mobileNumber = this.mobValue;
    this.ripsilCustomerService.getDataByMobileNumber(this.holdData).subscribe(data => {
      this.holdData = data;
      this.valueData = data;
      this.holdValue = data;
      this.holdValue = new MatTableDataSource<Element>(this.valueData);
      this.holdValue.paginator = this.paginator;
      this.array = this.valueData;
      this.totalSize = this.array.length;
      this.iterator();
    }, err => {
      console.log(err);
    });
  }
  getMobileNumber() {
    this.mobValue =  this.localStorageService.retrieve('mobileNumber');
  }
  UnitWise(unit) {
    if (unit === 'All') {
      this.holdValue = this.holdData;
      this.valueData = this.holdData;
      this.holdValue = this.holdData;
      this.holdValue = new MatTableDataSource<Element>(this.valueData);
      this.holdValue.paginator = this.paginator;
      this.array = this.valueData;
      this.totalSize = this.array.length;
      this.iterator();
    } else {
      this.valueData = this.holdData.filter(value => value.units === unit);
      this.holdValue = this.valueData;
      this.holdValue = new MatTableDataSource<Element>(this.valueData);
      this.holdValue.paginator = this.paginator;
      this.array = this.valueData;
      this.totalSize = this.array.length;
      this.iterator();
    }
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
    this.holdValue = part;
  }
}
