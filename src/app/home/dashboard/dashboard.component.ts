import { Component, OnInit, Input, OnDestroy, ElementRef, ViewChild,
   AfterViewInit, ChangeDetectorRef, DoCheck , Inject, OnChanges} from '@angular/core';
import { DashBoardService } from '../dashboard/dashboard.service';
import { ProgressBarService } from '../progress-bar/progress-bar.service';
import { Subscription } from 'rxjs';
import * as Hammer from 'hammerjs';
import { Router, ChildActivationEnd } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { StatusService } from '../../status/status.service';
import { StautsViewComponent } from '../../status/stauts-view/stauts-view.component';
import { OurWorkModel } from './../../shared/viewOurWork.model';
import { OurworkManagementService } from './../../ourwork-management/ourwork-management.service';
import { OurworkComponent } from './../../ourwork-management/ourwork/ourwork.component';
import {VideoPortfolioService} from './../../video-portfolio-management/video-portfolio.service';
import {VideoPortfolioComponent} from './../../video-portfolio-management/video-portfolio/video-portfolio.component';
import {VideoModel} from './../../shared/viewVideos.model';
@Component({
  providers: [StautsViewComponent],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, DoCheck {
  @ViewChild(MatSidenav)
  public sidenav?: MatSidenav;
  ourWorkModel: OurWorkModel;
  ourWorkModelView: OurWorkModel;
  videoModel: VideoModel;
  videoModelView: VideoModel;
  subMenus: boolean;
  menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  menuItemsSub: Subscription;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  mobileNo;
  enable: boolean;
  subid: string;
  logoutValue;
  showLogout: boolean;
  filterValue;
  isExpanded = true;
  showSubmenu = false;
  showSecondSubmenu = false;
  showThirdSubmenu = false;
  showFourthSubmenu = false;
  showFifthSubmenu = false;
  showSixSubmenu = false;
  showSeventhSubMenu = false;
  selectedMenu;
  messageTest: string;
  isShowing = false;
  urlModel: string;
  videoUrlModel: string;
  viewId;
  toggleBar = 'collapseMenuBar';
  selectedMenuList;
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  loginData: any;
  constructor( public dashboardService: DashBoardService, private changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private localStorageService: LocalStorageService, private router: Router,
     private activatedRoute: ActivatedRoute, private activeRoute: ActivatedRoute,
    private ourService: OurworkManagementService, private videoService: VideoPortfolioService,
    private statusService: StatusService, elementRef: ElementRef, private progressBarService: ProgressBarService) {
      const hammertime = new Hammer(elementRef.nativeElement, { threshold: 30});
      hammertime.on('panright', (ev) => {
          this.sidenav.open();
      });
      hammertime.on('panleft', (ev) => {
          this.sidenav.close();
      });
    this.mobileQuery = media.matchMedia('(max-width: 900px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
    this.getLogin();
   /*  this.getLoginValue(); */
    this.menuItemsSub = this.dashboardService.menuItems$.subscribe(menuItem => {
      this.menuItems = menuItem.filter(item => item.type !== 'icon' && item.type !== 'separator');
      this.hasIconTypeMenuItem = !!this.menuItems.filter(item => item.type === 'icon').length;
    });
    this.logout();
    this.viewId = +this.activeRoute.snapshot.firstChild.params.viewid;
    /* console.log('viewId', this.viewId); */
    this.onSelect(this.viewId);
    this.openDashboardMenu();
    this.getAllCategory();
    this.getAllVideoCategory();
  }
  openDashboardMenu() {
    switch (this.viewId) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 17: {
        this.selectedDashboardFirst(this.viewId);
        break;
      }
      case 6:
      case 7:
      case 8:
      case 9:
      case 10: {
        this.selectedDashboardSecond(this.viewId);
        break;
      }
      case 11: {
        this.selectedDashboardThird(this.viewId);
        break;
      }
      case 12:
      case 13:
      case 14:
      case 15:
      case 20: {
        this.selectedDashboardFourth(this.viewId);
        break;
      }
      case 16: {
        this.selectedDashboardFifth(this.viewId);
        break;
      }
      case 18: {
        this.selectedDashboardSix(this.viewId);
        break;
      }
      case 19: {
        this.selectedDashboardSeven(this.viewId);
        break;
      }
    }
  }
  onSelect(id): void {
    this.selectedMenuList = id;
    /* this.progressBarService.open(); */
  }
  collapseMenu() {
    this.toggleBar = this.toggleBar === 'colapseMenuBar' ? 'expandMenuBar' : 'colapseMenuBar';
  }

  selectedFirst() {
    this.showSubmenu = !this.showSubmenu;
    this.showSecondSubmenu = false;
    this.showThirdSubmenu = false;
    this.showFourthSubmenu = false;
    this.showFifthSubmenu = false;
    this.showSixSubmenu = false;
    this.showSeventhSubMenu = false;
  }
  getAllCategory() {
    this.ourService.fullMainCategory().subscribe(data => {
      if (data.length !== 0)       {
      this.ourWorkModel = data;
      const config = this.router.config;
        config.push({path: 'ourwork/:mainid/:subid', component: OurworkComponent});
        this.router.resetConfig(config);
        this.urlModel = this.ourWorkModel[0]._id;
     /*    console.log(this.router); */
      console.log('dashboardcategory', this.ourWorkModel);
     }     else     {
       this.urlModel = '';
     }
    }, error => {
      console.log(error);
    });
  }
  getAllVideoCategory() {
    this.videoService.fullVideoMainCategory().subscribe(data => {
      if (data.length !== 0)       {
      this.videoModel = data;
      const config = this.router.config;
        config.push({path: 'videoportfolio/:mainid/:subid', component: VideoPortfolioComponent});
        this.router.resetConfig(config);
        this.videoUrlModel = this.videoModel[0]._id;
       /*  console.log(this.videoUrlModel, ' url id'); */
      console.log('dashboardvideocategory', this.videoModel);
     }     else     {
       this.videoUrlModel = '';
     }
    }, error => {
      console.log(error);
    });
  }
  selectedDashboardFirst(id)   {
    this.onSelect(id);
    this.sidenav.open();
    this.showSubmenu = true;
    this.showSecondSubmenu = false;
    this.showThirdSubmenu = false;
    this.showFourthSubmenu = false;
    this.showFifthSubmenu = false;
    this.showSixSubmenu = false;
    this.showSeventhSubMenu = false;
    this.collapseMenu();
  }
  selectedSecond() {
    this.showSecondSubmenu = !this.showSecondSubmenu;
    this.showSubmenu = false;
    this.showThirdSubmenu = false;
    this.showFourthSubmenu = false;
    this.showFifthSubmenu = false;
    this.showSixSubmenu = false;
    this.showSeventhSubMenu = false;
  }
  selectedDashboardSecond(id)   {
    this.onSelect(id);
    this.sidenav.open();
    this.showSubmenu = false;
    this.showSecondSubmenu = true;
    this.showThirdSubmenu = false;
    this.showFourthSubmenu = false;
    this.showFifthSubmenu = false;
    this.showSixSubmenu = false;
    this.collapseMenu();
    this.showSeventhSubMenu = false;
  }
  selectedThird() {
    this.showThirdSubmenu = !this.showThirdSubmenu;
    this.showSubmenu = false;
    this.showSecondSubmenu = false;
    this.showFourthSubmenu = false;
    this.showFifthSubmenu = false;
    this.showSixSubmenu = false;
    this.showSeventhSubMenu = false;
  }
  selectedDashboardThird(id) {
    this.onSelect(id);
    this.sidenav.open();
    this.showSubmenu = false;
    this.showSecondSubmenu = false;
    this.showThirdSubmenu = true;
    this.showFourthSubmenu = false;
    this.showFifthSubmenu = false;
    this.showSixSubmenu = false;
    this.showSeventhSubMenu = false;
    this.collapseMenu();
  }
  selectedFourth() {
    this.showFourthSubmenu = !this.showFourthSubmenu;
    this.showSubmenu = false;
    this.showSecondSubmenu = false;
    this.showThirdSubmenu = false;
    this.showFifthSubmenu = false;
    this.showSixSubmenu = false;
    this.showSeventhSubMenu = false;
  }
  selectedDashboardFourth(id) {
    this.onSelect(id);
    this.sidenav.open();
    this.showSubmenu = false;
    this.showSecondSubmenu = false;
    this.showThirdSubmenu = false;
    this.showFourthSubmenu = true;
    this.showFifthSubmenu = false;
    this.showSixSubmenu = false;
    this.showSeventhSubMenu = false;
    this.collapseMenu();
  }
  selectedFifth() {
    this.showFifthSubmenu = !this.showFifthSubmenu;
    this.showSubmenu = false;
    this.showSecondSubmenu = false;
    this.showThirdSubmenu = false;
    this.showFourthSubmenu = false;
    this.showSixSubmenu = false;
    this.showSeventhSubMenu = false;
  }
  selectedDashboardFifth(id) {
    this.onSelect(id);
    this.sidenav.open();
    this.showSubmenu = false;
    this.showSecondSubmenu = false;
    this.showThirdSubmenu = false;
    this.showFourthSubmenu = false;
    this.showFifthSubmenu = true;
    this.showSixSubmenu = false;
    this.showSeventhSubMenu = false;
    this.collapseMenu();
  }
  selectedSix() {
    this.showSixSubmenu = !this.showSixSubmenu;
    this.showSubmenu = false;
    this.showSecondSubmenu = false;
    this.showThirdSubmenu = false;
    this.showFourthSubmenu = false;
    this.showFifthSubmenu = false;
    this.showSeventhSubMenu = false;
  }
  selectedDashboardSix(id)   {
    this.onSelect(id);
    this.sidenav.open();
    this.showSubmenu = false;
    this.showSecondSubmenu = false;
    this.showThirdSubmenu = false;
    this.showFourthSubmenu = false;
    this.showFifthSubmenu = false;
    this.showSixSubmenu = true;
    this.showSeventhSubMenu = false;
    this.collapseMenu();
  }
  selectedSeven() {
    this.showSeventhSubMenu = !this.showSeventhSubMenu;
    this.showSixSubmenu = false;
    this.showSubmenu = false;
    this.showSecondSubmenu = false;
    this.showThirdSubmenu = false;
    this.showFourthSubmenu = false;
    this.showFifthSubmenu = false;
  }
  selectedDashboardSeven(id)   {
    this.onSelect(id);
    this.sidenav.open();
    this.showSubmenu = false;
    this.showSecondSubmenu = false;
    this.showThirdSubmenu = false;
    this.showFourthSubmenu = false;
    this.showFifthSubmenu = false;
    this.showSixSubmenu = false;
    this.showSeventhSubMenu = true;
    this.collapseMenu();
  }
  ngDoCheck() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
  }
  getLogin() {
  this.loginData = this.localStorageService.retrieve('userloggedin');
  }
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }
  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  ngOnDestroy(): void {
    // if(this.sidebarPS) {
    //   this.sidebarPS.destroy();
    // }
    this.mobileQuery.removeListener(this._mobileQueryListener);
    if (this.menuItemsSub) {
      this.menuItemsSub.unsubscribe();
    }
  }
  logout() {
     this.dashboardService.getLogout();
    /* if (this.logoutValue === 'true') {
      this.showLogout = true;
    } */
  }
  homePage() {
    this.router.navigate(['/welcome']);
  }
  /* getCancelled() {
   this.router.navigate(['/dashboard/cancelled']);
  }
  getStatus() {
    this.router.navigate(['/dashboard/bookingstatus']);
   } */
  getActive(id) {
    this.onSelect(id);
    this.showSubmenu = false;
    this.showSecondSubmenu = false;
    this.showThirdSubmenu = false;
    this.showFourthSubmenu = true;
    this.showFifthSubmenu = false;
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    if (this.mobileNo === null) {
      this.router.navigate(['/dashboard/newUser', 12]);
    } else if (this.mobileNo != null) {
      this.mobileNo = this.localStorageService.retrieve('mobileno');
      console.log(this.mobileNo);
      this.router.navigate(['/dashboard/statusView', 12, this.mobileNo]);
    }
    /* this.selectedDashboardFourth(); */
  }

  /*   getCompleted() {
      this.router.navigate(['/dashboard/completed']);
    } */

    /* getLoginValue() {
      this.loginData = this.localStorageService.retrieve('userloggedin');
      } */
    logoutValu() {
      this.localStorageService.clear('mobileNumber');
        sessionStorage.setItem('loginUser', 'false');
        this.localStorageService.store('userLoggedIn', 'false');
        sessionStorage.removeItem('token');
        this.dashboardService.getLogout();
        /* this.getLogin(); */
      }
}
