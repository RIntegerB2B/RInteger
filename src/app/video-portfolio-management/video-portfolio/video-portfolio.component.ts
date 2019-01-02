import { Component, OnInit, ViewChild, Input, DoCheck } from '@angular/core';
import { VideoModel } from '../../shared/viewVideos.model';
import { Router, ActivatedRoute } from '@angular/router';
import { VideoPortfolioService } from './../video-portfolio.service';
import { AppSetting } from '../../config/appSetting';
import { ProgressBarService } from '../../home/progress-bar/progress-bar.service';

@Component({
  selector: 'app-video-portfolio',
  templateUrl: './video-portfolio.component.html',
  styleUrls: ['./video-portfolio.component.css']
})
export class VideoPortfolioComponent implements OnInit {
  selectedSubMenu: any;
  selectedMainMenu: any;
  subService: any;
  subid: string;
  viewId;
  noData = false;
  serviceModel: any;
  videoModel: VideoModel[] = [];
  videoModelView: VideoModel;
  services: any;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
     private videoService: VideoPortfolioService, private progressBarService: ProgressBarService) {
      this.viewId = this.activatedRoute.snapshot.params['viewid'];
      this.subid = this.activatedRoute.snapshot.params['subid'];
      }

  ngOnInit() {
    this.getSubCategory();
  }
  onSelectMain(service)   {
    this.selectedMainMenu = service;
    this.services = service.mainCategory;
  }
  onSelectSub(subService)   {
    this.selectedSubMenu = subService;
    this.videoModelView = subService;
    console.log(this.videoModelView);
  }
  getSubCategory() {
    this.progressBarService.open();
    this.videoService.fullVideoSubCategory(this.subid).subscribe(data => {
      if (data.length !== 0)       {
      this.videoModel = data;
      this.serviceModel = this.videoModel[0].mainCategory[0];
      this.onSelectSub(this.serviceModel);
      this.progressBarService.close();
      }       else      {
        this.noData = true;
      }
    }, error => {
      console.log(error);
    });
  }
  test() {
    console.log('data passing');
  }
}
