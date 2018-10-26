import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-it-services',
  templateUrl: './it-services.component.html',
  styleUrls: ['./it-services.component.css']
})
export class ItServicesComponent implements OnInit {
showWebsite: boolean;
showCloud: boolean;
showWebApp: boolean;
showProduct: boolean;
  selected = 'Website Development';
  constructor() { }

  ngOnInit() {
    this.onWebsite();
  }
  onWebsite() {
  this.showCloud = false;
  this.showWebApp = false;
  this.showWebsite = true;
  this.showProduct = false;
  }
  onCloud()  {
    this.showCloud = true;
  this.showWebApp = false;
  this.showWebsite = false;
  this.showProduct = false;
  }
  onWebApp()  {
    this.showCloud = false;
  this.showWebApp = true;
  this.showWebsite = false;
  this.showProduct = false;
  }
  onProduct()  {
    this.showCloud = false;
    this.showWebApp = false;
    this.showWebsite = false;
    this.showProduct = true;
  }
}
