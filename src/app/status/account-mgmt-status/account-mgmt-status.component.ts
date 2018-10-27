import { Component, OnInit, Inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { StatusService } from '../status.service';

import {DigitalMgmtStatus} from '../stauts-view/account-mgmt-status.model';

@Component({
  selector: 'app-account-mgmt-status',
  templateUrl: './account-mgmt-status.component.html',
  styleUrls: ['./account-mgmt-status.component.css']
})
export class AccountMgmtStatusComponent implements OnInit {
no;
StatusModel: DigitalMgmtStatus;
  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute, private dialog: MatDialog, private router: Router,
     private statusService: StatusService) {
    this.no = this.activatedRoute.snapshot.paramMap.get('data');
  }

  ngOnInit() {
    this.getStatus();
  }


  getStatus( ) {
    this.statusService.getAccountMgmtStatus(this.no).subscribe(data => {
      console.log(data);
  this.StatusModel = data;
  }, error => {
    console.log(error);

  });
  }
}
