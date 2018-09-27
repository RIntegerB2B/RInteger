import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { DashBoardService } from '../dashboard/dashboard.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';

import {StatusService} from '../../status/status.service';
import { StautsViewComponent } from '../../status/stauts-view/stauts-view.component';

@Component({
  providers: [StautsViewComponent],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  subMenus: boolean;
  menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  menuItemsSub: Subscription;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  mobileNo;
  enable: boolean;
  filterValue;
  toggleBar = 'colapseMenuBar';
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  constructor(public dashboardService: DashBoardService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private localStorageService: LocalStorageService, private router: Router, private activeRoute: ActivatedRoute,
     private statusService: StatusService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }
  ngOnInit() {
    this.menuItemsSub = this.dashboardService.menuItems$.subscribe(menuItem => {
      this.menuItems = menuItem.filter(item => item.type !== 'icon' && item.type !== 'separator');
      this.hasIconTypeMenuItem = !!this.menuItems.filter(item => item.type === 'icon').length;
    });
  }
  collapseMenu() {
    this.toggleBar = this.toggleBar === 'colapseMenuBar' ? 'expandMenuBar' : 'colapseMenuBar';
  }
  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.sidebarPS = new PerfectScrollbar('#sidebar-top-scroll-area', {
    //     suppressScrollX: true
    //   })
    // })
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
  homePage() {
    this.router.navigate(['/welcome']);
  }
  getCancelled() {
   this.router.navigate(['/cancelled']);
  }
  getStatus() {
    this.router.navigate(['/bookingstatus']);
   }
  getActive() {
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    if (this.mobileNo === null) {
      this.router.navigate(['/newUser']);
    } else if (this.mobileNo != null) {
      this.mobileNo = this.localStorageService.retrieve('mobileno');
      this.router.navigate(['/statusView', this.mobileNo]);
    }
  }
}
