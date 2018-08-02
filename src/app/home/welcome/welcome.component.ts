import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { empty } from 'rxjs';

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
    console.log(this.mobileNo);
    if ( this.mobileNo === null) {
      this.router.navigate(['/newUser']);
    } else if (this.mobileNo != null) {
      this.mobileNo = this.localStorageService.retrieve('mobileno');
      this.router.navigate(['/statusView', this.mobileNo]);
    }
}

}
