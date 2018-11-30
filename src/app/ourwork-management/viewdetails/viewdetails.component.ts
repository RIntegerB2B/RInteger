import { Component, OnInit, Input  } from '@angular/core';
import {  OurWorkModel } from '../../shared/viewOurWork.model';
import { OurworkManagementService } from './../ourwork-management.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSetting } from '../../config/appSetting';
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
  subid: string;
  constructor(private ourService: OurworkManagementService, private router: Router
     , private activatedRoute: ActivatedRoute) { }

  services = [{
    id: 1, name: 'test3'
  }, {
    id: 2, name: 'test4'
  },  {
    id: 3, name: 'test5'
  }];
  totalImages =  [{
    id: 1, name: '../../../assets/images/lookbook/1.jpg'
  }, {
    id: 2, name: '../../../assets/images/lookbook/2.jpg'
  },  {
    id: 3, name:  '../../../assets/images/lookbook/3.jpg'
  },  {
    id: 4, name: '../../../assets/images/lookbook/4.jpg'
  },
    {
    id: 5, name: '../../../assets/images/lookbook/5.jpg'
  },  {
    id: 6, name: '../../../assets/images/lookbook/6.jpg'
  },  {
    id: 7, name: '../../../assets/images/lookbook/7.jpg'
  },  {
    id: 8, name: '../../../assets/images/lookbook/8.jpg'
  }
];
  ngOnInit() {
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
  backView()   {
    this.router.navigate(['/dashboard/ourwork', this.mainid]);
  }
}
