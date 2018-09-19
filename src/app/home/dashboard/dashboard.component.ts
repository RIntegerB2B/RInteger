import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { DashBoardService } from '../dashboard/dashboard.service';
import { Subscription } from 'rxjs';
import {MediaMatcher} from '@angular/cdk/layout';
@Component({
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
  constructor( private headerSideService: DashBoardService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
      this.menuItemsSub = this.headerSideService.menuItems$.subscribe(menuItem => {
        this.menuItems = menuItem.filter(item => item.type !== 'icon' && item.type !== 'separator');
        this.hasIconTypeMenuItem = !!this.menuItems.filter(item => item.type === 'icon').length;
    });
  }
  ngAfterViewInit() {
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
  subMenu() {
    this.subMenus = true;
  }
}
