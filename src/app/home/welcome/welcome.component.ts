import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { empty } from 'rxjs';
import {map} from 'rxjs/operators';

import {DashboardComponent} from '../dashboard/dashboard.component';
import {DashBoardService} from '../dashboard/dashboard.service';


@Component({
  providers: [DashboardComponent],
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  mobileNo: string;
  showIndicators = false;
  imageSources = ['../../../assets/images/Banner-1.jpg', '../../../assets/images/Banner-2.jpg' ,
  '../../../assets/images/Banner-3.jpg'];

  featuresImages = ['../../../assets/images/Features-1.jpg', '../../../assets/images/Features-2.jpg',
  '../../../assets/images/Features-3.jpg'];

  clientImages = ['../../../assets/images/flf.png', '../../../assets/images/tcs.png',
  '../../../assets/images/arvind.png', '../../../assets/images/pothys.png', '../../../assets/images/lee.jpg'];

  constructor(private router: Router, private localStorageService: LocalStorageService, private  dashBoard: DashboardComponent,
    private dashboardService: DashBoardService) { }

  ngOnInit() {
   /*  this.dashboardService.hideMenuTransparent(); */
  }
  getStatus() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    console.log(this.mobileNo);
    if ( this.mobileNo === null) {
      this.router.navigate(['/dashboard/newUser']);
    } else if (this.mobileNo != null) {
      this.mobileNo = this.localStorageService.retrieve('mobileno');
      this.router.navigate(['/dashboard/statusView', this.mobileNo]);
    }
}

}
