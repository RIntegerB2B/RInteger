import { Component, OnInit, Input, Inject  } from '@angular/core';
import {  OurWorkModel } from '../../shared/viewOurWork.model';
import { OurworkManagementService } from './../ourwork-management.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSetting } from '../../config/appSetting';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.css']
})
export class ViewdetailsComponent implements OnInit {
  selectedSubMenu: any;
  imageUrl: string = AppSetting.imageOurWorkServerPath;
  ourWorkModel: OurWorkModel;
  message: any;
  mainid: string;
  viewId;
  subid: string;
  nextNoData = false;
  constructor(private ourService: OurworkManagementService, private router: Router
     , private activatedRoute: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
    this.viewId = this.activatedRoute.snapshot.params['viewid'];
     this.mainid = this.activatedRoute.snapshot.params['mainid'];
     this.subid = this.activatedRoute.snapshot.params['subid'];
     console.log(this.ourWorkModel);
     this.getSubCategory();
  }
  onSelectView(service)   {
    this.selectedSubMenu = service;
    console.log(service);
  }
  selectOption(event)   {
    console.log(event);
  }
  getSubCategory() {
    this.ourService.fullSubCategory(this.mainid).subscribe(data => {
      this.ourWorkModel = data;
      console.log('category', this.ourWorkModel);
      console.log('subid', this.subid);
    }, error => {
      console.log(error);
    });
  }
  backView(back)   {
    if (back !== null)     {
      console.log(back);
      this.router.navigate(['/dashboard/allourwork', this.viewId, this.mainid, back ]);
     /*  this.router.navigate(['/dashboard/ourwork/', this.viewId, this.mainid]); */
    } else   {
      this.router.navigate(['/dashboard/ourwork/', this.viewId, this.mainid]);
    }
  }
  nextView(next)   {
    if (next !== null)     {
    console.log(next);
    this.router.navigate(['/dashboard/allourwork', this.viewId, this.mainid, next ]);
   /*  this.router.navigate(['/dashboard/ourwork/', this.viewId, this.mainid]); */
  } else   {
    this.nextNoData = true;
  }
  }
  public confirm(fullData: OurWorkModel = {}, mainImage): Observable<boolean> {
    const dialogRef = this.dialog.open(ZoomComponent, {
      width: '540px',
      disableClose: true,
      data: [fullData, this.subid, mainImage],
    });
    return dialogRef.afterClosed();
  }

}
@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html'
})
export class ZoomComponent implements OnInit {
  imageUrl: string = AppSetting.imageOurWorkServerPath;
  myCarouselOptions = { items: 1, dots: true, nav: true,
  };
constructor(private router: Router
  , private activatedRoute: ActivatedRoute, public dialogRef: MatDialogRef<ZoomComponent>,
  @Inject(MAT_DIALOG_DATA) public fullData: OurWorkModel) {
  console.log(fullData);
  this.imageUrl = this.imageUrl;
}
cancel(): void {
  this.dialogRef.close();
}

ngOnInit() {
}
}
