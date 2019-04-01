import { SwUpdate } from '@angular/service-worker';
import { Component, OnInit, Inject, AfterViewInit, ChangeDetectorRef
 } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { DashBoardService } from './home/dashboard/dashboard.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  routerData: any;
  constructor(
   private swUpdate: SwUpdate, private changeDetectorRef:
    ChangeDetectorRef, private route: Router, private metaService: Meta, private dashBoardService: DashBoardService) {
    this.routerData = this.route.config;
    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
  }
  ngOnInit() {
        if (this.swUpdate.isEnabled) {
            this.swUpdate.available.subscribe((evt) => {
                console.log('service worker updated');
            });
            this.swUpdate.checkForUpdate().then(() => {
                // noop
            }).catch((err) => {
                console.error('error when checking for update', err);
            });
        }}
  /* sendEvent = () => {
    (<any>window).ga('send', 'event', {
      eventCategory: 'eventCategory',
      eventLabel: 'eventLabel',
      eventAction: 'eventAction',
      eventValue: 10
    });
  } */
}
