import { Component, OnInit, ViewChild } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';

import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  mobileNo;
  
  readonly VAPID_PUBLIC_KEY = 'BEe66AvTCe_qowysFNV2QsGWzgEDnUWAJq1ytVSXxtwqjcf0bnc6d5USXmZOnIu6glj1BFcj87jIR5eqF2WJFEY';
  toggleBar = 'colapseMenuBar';
  constructor( private localStorageService: LocalStorageService,
    private swUpdate: SwUpdate, private swPush: SwPush, private router: Router) {
    }

  ngOnInit() {
  }

  collapseMenu() {
    this.toggleBar = this.toggleBar === 'colapseMenuBar' ? 'expandMenuBar' : 'colapseMenuBar';
  }
  getActive() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    if (this.mobileNo === null) {
      this.router.navigate(['/dashboard/newUser', 12]);
    } else if (this.mobileNo != null) {
      this.mobileNo = this.localStorageService.retrieve('mobileno');
      this.router.navigate(['/dashboard/statusView', 12, this.mobileNo]);
    }
  }
  }
