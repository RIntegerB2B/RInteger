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
  userName;
  readonly VAPID_PUBLIC_KEY = 'BEe66AvTCe_qowysFNV2QsGWzgEDnUWAJq1ytVSXxtwqjcf0bnc6d5USXmZOnIu6glj1BFcj87jIR5eqF2WJFEY';
  constructor( private localStorageService: LocalStorageService, private fb: FormBuilder, private router: Router,
    private swUpdate: SwUpdate, private swPush: SwPush, private subscribeService: SubscribeService) { }

  ngOnInit() {
    this.createForm();
    this.checkData();
  }
  createForm() {
    this.subscribeForm = this.fb.group({
      mobileNumber: [ mobileNumber],
      name: ['']
    });
  }
checkData() {
  this.userName =  this.localStorageService.retrieve('name');
  this.mobileNo = this.localStorageService.retrieve('mobileno');
}
  subscribe(subscribeForm: FormGroup, mobileNum: any, name: any) {
    this. mobNo  = mobileNum;
 /*    console.log(this.mobNo); */
    this.localStorageService.store('mobileno', this.mobNo);
    this.localStorageService.store('name', name);
     this.swPush.requestSubscription({
       serverPublicKey: this.VAPID_PUBLIC_KEY
     })
       .then(sub => {
         this.subscribeModel = new Subscribe();
         this.subscribeModel.name = name;
         this.subscribeModel.isAdmin = false;
         this.subscribeModel.userSubscriptions = sub;
         this.subscribeModel.mobileNumber = this.mobNo;
         /* this.subscribeService.addPushSubscriber(this.subscribeModel).subscribe(); */
         this.subscribeService.addPushSubscriberOperation(this.subscribeModel).subscribe();
       })
       .catch(err => console.error('Could not subscribe to notifications', err));
   }
}
