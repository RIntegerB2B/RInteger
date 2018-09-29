import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-portfolio',
  templateUrl: './video-portfolio.component.html',
  styleUrls: ['./video-portfolio.component.css']
})
export class VideoPortfolioComponent implements OnInit {

  modelImages = ['../../../assets/images/meghna.jpg', '../../../assets/images/meghna.jpg',
  '../../../assets/images/meghna.jpg', '../../../assets/images/meghna.jpg'];
  saree: boolean;
  shirt: boolean;
  bottom: boolean;
  interWomen: boolean;
  interMen: boolean;
  overview: boolean;
  constructor() { }
  ngOnInit() {
    this.overview = true;
  }
  showOverView() {
    this.saree = false;
this.shirt = false;
this.bottom = false;
this.interMen = false;
this.interWomen = false;
this.overview = true;
  }
  showSaree() {
this.saree = true;
this.shirt = false;
this.bottom = false;
this.interMen = false;
this.interWomen = false;
this.overview = false;
  }
  showShirt() {
    this.saree = false;
    this.shirt = true;
    this.bottom = false;
    this.interMen = false;
    this.interWomen = false;
    this.overview = false;
  }
  showBottom() {
    this.saree = false;
this.shirt = false;
this.bottom = true;
this.interMen = false;
this.interWomen = false;
this.overview = false;
  }
  showInternMen() {
    this.saree = false;
this.shirt = false;
this.bottom = false;
this.interMen = true;
this.interWomen = false;
this.overview = false;
  }
  showInterWomen() {
  this.saree = false;
this.shirt = false;
this.bottom = false;
this.interMen = false;
this.interWomen = true;
this.overview = false;
  }
}
