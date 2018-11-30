import { Component, OnInit, ViewChild, Input, DoCheck } from '@angular/core';
import { OurWorkModel } from './../viewdetails/viewDetails.model';
import { Router, ActivatedRoute } from '@angular/router';
import { OurworkManagementService } from './../ourwork-management.service';
import { AppSetting } from '../../config/appSetting';


@Component({
  selector: 'app-ourwork',
  templateUrl: './ourwork.component.html',
  styleUrls: ['./ourwork.component.css']
})
export class OurworkComponent implements OnInit {
  imageUrl: string = AppSetting.imageOurWorkServerPath;
  selectedSubMenu: any;
  selectedMainMenu: any;
  subService: any;
  subid: string;
  noData = false;
  serviceModel: any;
  ourWorkModel: OurWorkModel[] = [];
  ourWorKModelView: OurWorkModel;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
     private ourService: OurworkManagementService) {
      this.subid = this.activatedRoute.snapshot.params['subid'];
      }
  services: any;
  ngOnInit() {
  this.getSubCategory();
  }
  onSelectMain(service)   {
    this.selectedMainMenu = service;
    this.services = service.mainCategory;
  }
  onSelectSub(subService)   {
    this.selectedSubMenu = subService;
    this.ourWorKModelView = subService;
    console.log(this.ourWorKModelView);
  }
  selectOption(event)   {
    console.log(event);
  }
  totalViewImage(subImage, mainImage)   {
    this.router.navigate(['/dashboard/allourwork', subImage._id, mainImage ]);
  }
 /*  ngDoCheck() {
    this.ourWorkModel = this.ourWorkModel;
    this.subid = this.activatedRoute.snapshot.params['subid'];
} */
getSubCategory() {
  this.ourService.fullSubCategory(this.subid).subscribe(data => {
    if (data.length !== 0)       {
    this.ourWorkModel = data;
    this.serviceModel = this.ourWorkModel[0].mainCategory[0];
    console.log('category', this.ourWorkModel);
    console.log('subid', this.subid);
    this.onSelectSub(this.serviceModel);
    }       else      {
      this.noData = true;
    }
  }, error => {
    console.log(error);
  });
}
}
