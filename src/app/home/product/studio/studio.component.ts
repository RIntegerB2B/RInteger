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
  selectedHero;
  num = 2;
  services = [
    {  name: 'Ecommerce Studio - Photo & Video' },
    {  name: 'Creative Studio - Photo & Video' },
    {  name: 'Pre Production' },
    {  name: 'Post Production' },
    {  name: 'Studio' },
  ];
  selectedValue = this.services[0].name;

  constructor() { }

  ngOnInit() {
    this.onSelect(this.services[0]);
    this.selectedValue = this.services[0].name;
  }
  onEcommerce() {
    this.hideEcommerce = true;
    this.hideCreative = false;
    this.hidePreProduction = false;
    this.hidePostProduction = false;
    this.hideStudio = false;
    }
  onSelect(service): void {
    if (service.name  === 'Ecommerce Studio - Photo & Video') {
      this.onEcommerce();
   } else if (service.name  === 'Creative Studio - Photo & Video') {
      this.onCreative();
   } else if (service.name  === 'Pre Production') {
      this.onPreProduction();
   } else if (service.name  === 'Post Production') {
        this.onPostProduction();
   } else {
      this.onStudio();
    }
    this.selectedHero = service;
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
