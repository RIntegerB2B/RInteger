import { Component, OnInit, Input, OnDestroy, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef, DoCheck } from '@angular/core';
import { DashBoardService } from '../dashboard/dashboard.service';
import { Subscription } from 'rxjs';
import * as Hammer from 'hammerjs';
import { Router, ChildActivationEnd } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { StatusService } from '../../status/status.service';
import { StautsViewComponent } from '../../status/stauts-view/stauts-view.component';

@Component({
  providers: [StautsViewComponent],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(MatSidenav)
  public sidenav: MatSidenav;
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
  selectedMenuList;
  
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  constructor(public dashboardService: DashBoardService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private localStorageService: LocalStorageService, private router: Router, private activeRoute: ActivatedRoute,
    private statusService: StatusService, elementRef: ElementRef) {
      const hammertime = new Hammer(elementRef.nativeElement, {});
      hammertime.on('panright', (ev) => {
          this.sidenav.open();
          console.log(this.sidenav);
      });
      hammertime.on('panleft', (ev) => {
          this.sidenav.close();
      });
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
    this.onSelect(this.viewId);
    this.openDashboardMenu();
  }
  openDashboardMenu() {
    switch (this.viewId) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5: {
        this.selectedFirst();
        break;
      }
      case 6:
      case 7:
      case 8:
      case 9:
      case 10: {
        this.selectedSecond();
        break;
      }
      case 11: {
        this.selectedThird();
        break;
      }
      case 12:
      case 13:
      case 14:
      case 15: {
        this.selectedFourth();
        break;
      }
      case 16: {
        this.selectedFifth();
      }
    }
  }
  onSelect(id): void {
    this.selectedMenuList = id;
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
    this.onSelect(this.viewId);
  }
  selectedDashboardFirst(id)   {
    this.onSelect(id);
    this.showSubmenu = true;
    this.showSecondSubmenu = false;
    this.showThirdSubmenu = false;
    this.showFourthSubmenu = false;
    this.showFifthSubmenu = false;
    this.collapseMenu();
  }
  selectedSecond() {
    this.showSecondSubmenu = !this.showSecondSubmenu;
    this.showSubmenu = false;
    this.showThirdSubmenu = false;
    this.showFourthSubmenu = false;
    this.showFifthSubmenu = false;
    this.onSelect(this.viewId);
  }
  selectedDashboardSecond(id)   {
    this.onSelect(id);
    this.showSubmenu = false;
    this.showSecondSubmenu = true;
    this.showThirdSubmenu = false;
    this.showFourthSubmenu = false;
    this.showFifthSubmenu = false;
    this.collapseMenu();
  }
  selectedThird() {
    this.showThirdSubmenu = !this.showThirdSubmenu;
    this.showSubmenu = false;
    this.showSecondSubmenu = false;
    this.showFourthSubmenu = false;
    this.showFifthSubmenu = false;
    this.onSelect(this.viewId);
  }
  selectedDashboardThird(id) {
    this.onSelect(id);
    this.showSubmenu = false;
    this.showSecondSubmenu = false;
    this.showThirdSubmenu = true;
    this.showFourthSubmenu = false;
    this.showFifthSubmenu = false;
    this.collapseMenu();
  }
  selectedFourth() {
    this.showFourthSubmenu = !this.showFourthSubmenu;
    this.showSubmenu = false;
    this.showSecondSubmenu = false;
    this.showThirdSubmenu = false;
    this.showFifthSubmenu = false;
    this.onSelect(this.viewId);
  }
  selectedDashboardFourth(id) {
    this.onSelect(id);
    this.showSubmenu = false;
    this.showSecondSubmenu = false;
    this.showThirdSubmenu = false;
    this.showFourthSubmenu = true;
    this.showFifthSubmenu = false;
    this.collapseMenu();
  }
  selectedFifth() {
    this.showFifthSubmenu = !this.showFifthSubmenu;
    this.showSubmenu = false;
    this.showSecondSubmenu = false;
    this.showThirdSubmenu = false;
    this.showFourthSubmenu = false;
    this.onSelect(this.viewId);
  }
  selectedDashboardFifth(id) {
    this.onSelect(id);
    this.showSubmenu = false;
    this.showSecondSubmenu = false;
    this.showThirdSubmenu = false;
    this.showFourthSubmenu = false;
    this.showFifthSubmenu = true;
    this.collapseMenu();
  }
/*   ngDoCheck() {
  
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    console.log('return:', this.mobileNo);
  } */
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
      console.log(this.mobileNo);
    } else if (this.mobileNo != null) {
      this.mobileNo = this.localStorageService.retrieve('mobileno');
      this.router.navigate(['/dashboard/statusView', 12, this.mobileNo]);
      console.log(this.mobileNo);
    }
    /* this.selectedDashboardFourth(); */
  }
  /*   getCompleted() {
      this.router.navigate(['/dashboard/completed']);
    } */
}
