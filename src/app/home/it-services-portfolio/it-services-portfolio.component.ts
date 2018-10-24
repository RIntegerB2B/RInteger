import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-it-services-portfolio',
  templateUrl: './it-services-portfolio.component.html',
  styleUrls: ['./it-services-portfolio.component.css']
})
export class ItServicesPortfolioComponent implements OnInit {
  website: boolean;
  application: boolean;
  hosting: boolean;
  all: boolean;
  constructor() { }

  ngOnInit() {
  }
  showAll() {
    this.website = false;
    this.application = false;
    this.hosting = false;
    this.all = true;
  }
  showWebsite() {
    this.website = true;
    this.application = false;
    this.hosting = false;
    this.all = false;
  }
  showApplication() {
    this.website = false;
    this.application = true;
    this.hosting = false;
    this.all = false;
  }
  showHosting() {
    this.website = false;
    this.application = false;
    this.hosting = true;
    this.all = false;
  }
}
