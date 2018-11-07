import { Component, OnInit, Input, OnDestroy, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef, DoCheck } from '@angular/core';
import { DashBoardService } from '../dashboard/dashboard.service';
import { Subscription } from 'rxjs';
import { Router, ChildActivationEnd } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { StatusService } from '../../status/status.service';
import { StautsViewComponent } from '../../status/stauts-view/stauts-view.component';

@Component({
  providers: [StautsViewComponent],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, DoCheck {
  @ViewChild(StautsViewComponent) child;
  subMenus: boolean;
  menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  menuItemsSub: Subscription;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  mobileNo;
  enable: boolean;
  logoutValue;
  showLogout: boolean;
  filterValue;
  isExpanded = true;
  showSubmenu = false;
  showSecondSubmenu = false;
  showThirdSubmenu = false;
  showFourthSubmenu = false;
  showFifthSubmenu = false;
  selectedMenu;
  messageTest: string;
  isShowing = false;
  viewId;
  toggleBar = 'collapseMenuBar';
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  constructor(public dashboardService: DashBoardService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private localStorageService: LocalStorageService, private router: Router, private activeRoute: ActivatedRoute,
    private statusService: StatusService) {

    this.mobileQuery = media.matchMedia('(max-width: 900px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
    this.menuItemsSub = this.dashboardService.menuItems$.subscribe(menuItem => {
      this.menuItems = menuItem.filter(item => item.type !== 'icon' && item.type !== 'separator');
      this.hasIconTypeMenuItem = !!this.menuItems.filter(item => item.type === 'icon').length;
    });
    this.logout();
    this.viewId = +this.activeRoute.snapshot.firstChild.params.viewid;
    console.log('viewId', this.viewId);
    this.openDashboardMenu();
  }
  openDashboardMenu() {
    switch (this.viewId) {
      case 1: {
        this.selectedFirst();
        break;
      }
      case 2: {
        this.selectedSecond();
        break;
      }
      case 3: {
        this.selectedThird();
        break;
      }
      case 4: {
        this.selectedFourth();
        break;
      }
      case 5: {
        this.selectedFifth();
      }
    }
  }
  collapseMenu() {
    this.toggleBar = this.toggleBar === 'colapseMenuBar' ? 'expandMenuBar' : 'colapseMenuBar';
  }

  selectedFirst() {
    this.showSubmenu = !this.showSubmenu;
  }
  selectedDashboardFirst()   {
    this.showSubmenu = true;
    this.collapseMenu();
  }
  selectedSecond() {
    this.showSecondSubmenu = !this.showSecondSubmenu;
  }
  selectedDashboardSecond()   {
    this.showSecondSubmenu = true;
    this.collapseMenu();
  }
  selectedThird() {
    this.showThirdSubmenu = !this.showThirdSubmenu;
  }
  selectedDashboardThird() {
    this.showThirdSubmenu = true;
    this.collapseMenu();
  }
  selectedFourth() {
    this.showFourthSubmenu = !this.showFourthSubmenu;
  }
  selectedDashboardFourth() {
    this.showFourthSubmenu = true;
    this.collapseMenu();
  }
  selectedDashboardFifth() {
    this.showFifthSubmenu = true;
    this.collapseMenu();
  }
  selectedFifth() {
    this.showFifthSubmenu = !this.showFifthSubmenu;
  }
  ngDoCheck() {
    /* setTimeout(() => {
    this.sidebarPS = new PerfectScrollbar('#sidebar-top-scroll-area', {
    suppressScrollX: true
       })
     })*/
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    console.log('return:', this.mobileNo);
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
    this.logoutValue = this.localStorageService.retrieve('userLoggedIn');
    if (this.logoutValue === 'true') {
      this.showLogout = true;
    }
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
  getActive() {
    this.showFourthSubmenu = true;
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    if (this.mobileNo === null) {
      this.router.navigate(['/dashboard/newUser', 4]);
      console.log(this.mobileNo);
    } else if (this.mobileNo != null) {
      this.mobileNo = this.localStorageService.retrieve('mobileno');
      this.router.navigate(['/dashboard/statusView', 4, this.mobileNo]);
      console.log(this.mobileNo);
    }
    /* this.selectedDashboardFourth(); */
  }
  /*   getCompleted() {
      this.router.navigate(['/dashboard/completed']);
    } */
}
