import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-digital-mgmt',
  templateUrl: './digital-mgmt.component.html',
  styleUrls: ['./digital-mgmt.component.css']
})
export class DigitalMgmtComponent implements OnInit {

  digitalMktg = false;
  mgmtservices = false;
  marketing = false;
  branding = false;
  marketPlaceService = false;
  selected = 'MarketPlace Services';
  constructor() { }

  ngOnInit() {
    this.onMarketPlace();
  }
  onDigitalMarket() {
    this.digitalMktg = true;
    this.mgmtservices = false;
    this.marketing = false;
    this.branding = false;
    this.marketPlaceService = false;
  }
  onMarketPlace()  {
    this.digitalMktg = false;
    this.marketPlaceService = true;
    this.marketing = false;
    this.branding = false;
    this.mgmtservices = false;
  }
  onMarketing()  {
    this.digitalMktg = false;
    this.mgmtservices = false;
    this.marketing = true;
    this.branding = false;
    this.marketPlaceService = false;
  }
  onBranding()  {
    this.digitalMktg = false;
    this.mgmtservices = false;
    this.marketing = false;
    this.branding = true;
    this.marketPlaceService = false;
  }
  onMgmtServices()  {
    this.digitalMktg = false;
    this.mgmtservices = true;
    this.marketPlaceService = false;
    this.branding = false;
    this.marketing =  false;
  }
}
