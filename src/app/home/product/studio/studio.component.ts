import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.css']
})
export class StudioComponent implements OnInit {
  hideEcommerce = false;
  hideFashion = false;
  hideCreate = false;
  hideShoot = false;
  constructor() { }

  ngOnInit() {
    this.onHiden();
  }
  onHiden() {
    this.hideEcommerce = true;
    this.hideFashion = false;
    this.hideCreate = false;
    this.hideShoot = false;
  }
  onFashion()  {
    this.hideEcommerce = false;
    this.hideFashion = true;
    this.hideCreate = false;
    this.hideShoot = false;
  }
  onCreate()  {
    this.hideEcommerce = false;
    this.hideFashion = false;
    this.hideCreate = true;
    this.hideShoot = false;
  }
  onShoot()  {
    this.hideEcommerce = false;
    this.hideFashion = false;
    this.hideCreate = false;
    this.hideShoot = true;
  }

}