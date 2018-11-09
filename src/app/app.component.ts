import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'app';
  routerData: any;
  constructor(route: Router) {
    console.log(route.config);
    console.log(route);
    this.routerData = route.config;
  }
  ngOnInit() {
  }
}
