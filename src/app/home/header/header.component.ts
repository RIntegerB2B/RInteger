import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';

import {HeaderService} from './header.service';
import { LocalStorageService } from 'ngx-webstorage';
import {Subscribe} from './subscribe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  subscribeModel: Subscribe;
  mobNum: number;
  readonly VAPID_PUBLIC_KEY = 'BEe66AvTCe_qowysFNV2QsGWzgEDnUWAJq1ytVSXxtwqjcf0bnc6d5USXmZOnIu6glj1BFcj87jIR5eqF2WJFEY';
  toggleBar = 'colapseMenuBar';
  constructor(private headerService: HeaderService, private localStorageService: LocalStorageService,
    private swUpdate: SwUpdate, private swPush: SwPush) { }

  ngOnInit() {
  }

  collapseMenu() {
    this.toggleBar = this.toggleBar === 'colapseMenuBar' ? 'expandMenuBar' : 'colapseMenuBar';
  }
  subscribe() {
   const  mobNo =  prompt('Enter the mobile number');
  this.mobNum = parseInt(mobNo, 10);
  this.localStorageService.store('mobileno', this.mobNum);
    console.log(this.mobNum);
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => {
        this.subscribeModel = new Subscribe();
        this.subscribeModel.isAdmin = false;
        this.subscribeModel.userSubscriptions = sub;
        this.subscribeModel.mobileNumber = this.mobNum;
        this.headerService.addPushSubscriber(this.subscribeModel).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }

}
