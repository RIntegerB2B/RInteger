import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.css']
})
export class StudioComponent implements OnInit {
  hideEcommerce = false;
  hideCreative = false;
  hidePreProduction = false;
  hidePostProduction = false;
  hideStudio = false;
  selected = 'Ecommerce Studio';
  constructor() { }

  ngOnInit() {
    this.onHiden();
  }
  onHiden() {
    this.hideEcommerce = true;
    this.hideCreative = false;
    this.hidePreProduction = false;
    this.hidePostProduction = false;
    this.hideStudio = false;
  }
  onCreative()  {
    this.hideEcommerce = false;
    this.hideCreative = true;
    this.hidePreProduction = false;
    this.hidePostProduction = false;
    this.hideStudio = false;
  }
  onPreProduction()  {
    this.hideEcommerce = false;
    this.hideCreative = false;
    this.hidePreProduction = true;
    this.hidePostProduction = false;
    this.hideStudio = false;
  }
  onPostProduction()  {
    this.hideEcommerce = false;
    this.hideCreative = false;
    this.hidePreProduction = false;
    this.hidePostProduction = true;
    this.hideStudio = false;
  }
  onStudio()  {
    this.hideEcommerce = false;
    this.hideCreative = false;
    this.hidePreProduction = false;
    this.hidePostProduction = false;
    this.hideStudio = true;
  }

}
