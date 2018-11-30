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
  @Input()  parentCount: any;
  subService: any;
  imagePath1;
  imagePath2;
  imagePath3;
  subid: string;
  serviceModel: any;
  ourWorkModel: OurWorkModel[] = [];
  ourWorKModelView: OurWorkModel;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
     private ourService: OurworkManagementService) {
      this.subid = this.activatedRoute.snapshot.params['subid'];
      }
  services: any; /* = [{
    id: 1, name: 'test1'
  }, {
    id: 2, name: 'test2'
  },  {
    id: 3, name: 'test3'
  } ];*/
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
  this.getSubCategory();
  }
  onSelectMain(service)   {
    this.selectedMainMenu = service;
    this.imagePath1 = service.categoryName;
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
      this.ourWorkModel = data;
      this.serviceModel = this.ourWorkModel[0].mainCategory[0];
      console.log('category', this.ourWorkModel);
      console.log('subid', this.subid);
      this.onSelectSub(this.serviceModel);
    }, error => {
      console.log(error);
    });
  }
}
