import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { empty } from 'rxjs';
import {map} from 'rxjs/operators';
import { DragScrollComponent } from 'ngx-drag-scroll';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  mobileNo: string;
  showIndicators = false;
  patrnerimagesUrl;
  clientimagesUrl;

  constructor(private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.patrnerimagesUrl = [
      '../../../assets/images/amazon.png',
      '../../../assets/images/flipkart.png',
      '../../../assets/images/paytm.jpg',
      ];
      this.clientimagesUrl = [
        '../../../assets/images/flf.png',
        '../../../assets/images/lee.jpg',
        '../../../assets/images/arvind.png',
        '../../../assets/images/tcs.png',
        '../../../assets/images/pothys.png',
        ];
  }
  getStatus() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    console.log(this.mobileNo);
    if ( this.mobileNo === null) {
      this.router.navigate(['/newUser']);
    } else if (this.mobileNo != null) {
      this.mobileNo = this.localStorageService.retrieve('mobileno');
      this.router.navigate(['/statusView', this.mobileNo]);
    }
}

}
