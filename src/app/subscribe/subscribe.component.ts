import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import {SubscribeService} from './subscribe.service';
import { LocalStorageService } from 'ngx-webstorage';
import {Subscribe} from './subscribe.model';
import {mobileNumber} from '../shared/validation';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  subscribeModel: Subscribe;
  mobNum: number;
  mobNo;
  mobileNo;
  subscribeForm: FormGroup;
  readonly VAPID_PUBLIC_KEY = 'BEe66AvTCe_qowysFNV2QsGWzgEDnUWAJq1ytVSXxtwqjcf0bnc6d5USXmZOnIu6glj1BFcj87jIR5eqF2WJFEY';
  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private localStorageService: LocalStorageService, private fb: FormBuilder, private router: Router,
    private swUpdate: SwUpdate, private swPush: SwPush, private subscribeService: SubscribeService) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.subscribeForm = this.fb.group({
      mobileNumber: [ mobileNumber]
    });
  }

  subscribe(subscribeForm: FormGroup, mobileNo: any) {
    this. mobNo  = mobileNo;
    console.log(this.mobNo);
    this.localStorageService.store('mobileno', this.mobNo);
   this.router.navigate(['/welcome']);
     this.swPush.requestSubscription({
       serverPublicKey: this.VAPID_PUBLIC_KEY
     })
       .then(sub => {
         this.subscribeModel = new Subscribe();
         this.subscribeModel.isAdmin = false;
         this.subscribeModel.userSubscriptions = sub;
         this.subscribeModel.mobileNumber = this.mobNo;
         this.subscribeService.addPushSubscriber(this.subscribeModel).subscribe();
       })
       .catch(err => console.error('Could not subscribe to notifications', err));
   }
}
