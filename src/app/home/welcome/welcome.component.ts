import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  mobileNo: string;

  constructor(private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit() {

  }

  getStatus() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.router.navigate(['/statusView', this.mobileNo]);
    const len = this.mobileNo.length;
    console.log(len);
    if (len === 0) {
      this.router.navigate(['/booking']);
    }
  }

}
