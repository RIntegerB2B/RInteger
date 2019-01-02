import { Component, OnInit, ViewChild , Inject} from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';

import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { OurWorkModel } from './../../shared/viewOurWork.model';
import { OurworkManagementService } from './../../ourwork-management/ourwork-management.service';
import {VideoPortfolioService} from './../../video-portfolio-management/video-portfolio.service';
import {VideoModel} from './../../shared/viewVideos.model';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  mobileNo;
  ourWorkModel: OurWorkModel;
  videoModel: VideoModel;
  urlModel: string;
  url1Model: string;
  readonly VAPID_PUBLIC_KEY = 'BEe66AvTCe_qowysFNV2QsGWzgEDnUWAJq1ytVSXxtwqjcf0bnc6d5USXmZOnIu6glj1BFcj87jIR5eqF2WJFEY';
  toggleBar = 'colapseMenuBar';
  constructor(  private localStorageService: LocalStorageService,  private ourService: OurworkManagementService,
    private videoPortfolioService: VideoPortfolioService,
    private swUpdate: SwUpdate, private swPush: SwPush, private router: Router) {
    }

  ngOnInit() {
    this.getAllCategory();
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
  getAllCategory() {
    this.ourService.fullMainCategory().subscribe(data => {
      if (data.length !== 0)       {
      this.ourWorkModel = data;
        this.urlModel = this.ourWorkModel[0]._id;
        this.localStorageService.store('url', this.urlModel);
        console.log(this.router);
      console.log('dashboardcategory', this.ourWorkModel);
    } else {
      this.urlModel = '';
    }
  }, error => {
      console.log(error);
    });
  }
  getAllVideoCategory() {
    this.videoPortfolioService.fullVideoMainCategory().subscribe(data => {
      if (data.length !== 0)       {
      this.videoModel = data;
        this.url1Model = this.videoModel[0]._id;
        this.localStorageService.store('url1', this.videoModel);
        console.log(this.router);
      console.log('dashboardvideocategory', this.videoModel);
    } else {
      this.urlModel = '';
    }
  }, error => {
      console.log(error);
    });
  }
  }
