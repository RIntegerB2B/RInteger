import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  digitalMktg = false;
  mgmtservices = false;
  marketing = false;
  branding = false;
  marketPlaceService = false;
  selectedDigital = 'MarketPlace Services';
  selectedEcommerce = 'Ecommerce Production';
  fullEcommerce = false;
  fullDigital = false;
  fullItService = false;
  selectedSubIt;
  showWebsite = false;
  showCloud = false;
  showWebApp = false;
  showProduct = false;
  /* selected = 'Ecommerce Studio'; */
  selectedHero;
  selectedSub;
  selectedSubDigital;
  num = 2;
  studioProduction;
  services = [
    { name: 'Studio & Production' },
    { name: 'Digital-Business-Management' },
    { name: 'IT-Services' }
  ];
  selectedValue = this.services[0].name;

  constructor(private router: Router) { }

  ngOnInit() {
    this.onSelect(this.services[0]);
    this.onMarketPlace('MarketPlaceServices');
    this.onEcommerce('EcommerceProduction');
    this.onWebsite('Website Development');
    this.onWebsite('WebsiteDevelopment');
  }

  hideFullEcommerce() {
    this.fullEcommerce = true;
    this.fullDigital = false;
    this.fullItService = false;
  }
  hideFullDigital() {
    this.fullEcommerce = false;
    this.fullDigital = true;
    this.fullItService = false;
  }
  hideFullItService() {
    this.fullEcommerce = false;
    this.fullDigital = false;
    this.fullItService = true;
  }

  onEcommerce(service) {
    this.hideEcommerce = true;
    this.hideCreative = false;
    this.hidePreProduction = false;
    this.hidePostProduction = false;
    this.hideStudio = false;
    this.onSelectSubMenu(service);
  }
  onSelect(service): void {
    if (service.name === 'Studio & Production') {
      this.hideFullEcommerce();
      this.studioProduction = 'STUDIO & PRODUCTION';
    } else if (service.name === 'Digital-Business-Management') {
      this.hideFullDigital();
      this.studioProduction = 'DIGITAL BUSINESS MANAGEMENT';
    } else if (service.name === 'IT-Services') {
      this.hideFullItService();
      this.studioProduction = 'IT SERVICES';
    }
    this.selectedHero = service;
  }
  onSelectSubMenu(service) {
    this.selectedSub = service;
  }
  onSelectDigital(service) {
    this.selectedSubDigital = service;
  }
  onSelectIt(service) {
    this.selectedSubIt = service;
  }
  onCreative(service) {
    this.hideEcommerce = false;
    this.hideCreative = true;
    this.hidePreProduction = false;
    this.hidePostProduction = false;
    this.hideStudio = false;
    this.onSelectSubMenu(service);
  }
  onPreProduction(service) {
    this.hideEcommerce = false;
    this.hideCreative = false;
    this.hidePreProduction = true;
    this.hidePostProduction = false;
    this.hideStudio = false;
    this.onSelectSubMenu(service);
  }
  onPostProduction(service) {
    this.hideEcommerce = false;
    this.hideCreative = false;
    this.hidePreProduction = false;
    this.hidePostProduction = true;
    this.hideStudio = false;
    this.onSelectSubMenu(service);
  }
  onStudio(service) {
    this.hideEcommerce = false;
    this.hideCreative = false;
    this.hidePreProduction = false;
    this.hidePostProduction = false;
    this.hideStudio = true;
    this.onSelectSubMenu(service);
  }

  /*  digital management */
  onDigitalMarket(service) {
    this.digitalMktg = true;
    this.mgmtservices = false;
    this.marketing = false;
    this.branding = false;
    this.marketPlaceService = false;
    this.onSelectDigital(service);
  }
  onMarketPlace(service) {
    this.digitalMktg = false;
    this.marketPlaceService = true;
    this.marketing = false;
    this.branding = false;
    this.mgmtservices = false;
    this.onSelectDigital(service);
  }
  onMarketing(service) {
    this.digitalMktg = false;
    this.mgmtservices = false;
    this.marketing = true;
    this.branding = false;
    this.marketPlaceService = false;
    this.onSelectDigital(service);
  }
  onBranding(service) {
    this.digitalMktg = false;
    this.mgmtservices = false;
    this.marketing = false;
    this.branding = true;
    this.marketPlaceService = false;
    this.onSelectDigital(service);
  }
  onMgmtServices(service) {
    this.digitalMktg = false;
    this.mgmtservices = true;
    this.marketPlaceService = false;
    this.branding = false;
    this.marketing = false;
    this.onSelectDigital(service);
  }
/* IT services */

  onWebsite(service) {
    this.showCloud = false;
    this.showWebApp = false;
    this.showWebsite = true;
    this.showProduct = false;
    this.onSelectIt(service);
    }
    onCloud(service)  {
      this.showCloud = true;
    this.showWebApp = false;
    this.showWebsite = false;
    this.showProduct = false;
    this.onSelectIt(service);
    }
    onWebApp(service)  {
      this.showCloud = false;
    this.showWebApp = true;
    this.showWebsite = false;
    this.showProduct = false;
    this.onSelectIt(service);
    }
    onProduct(service)  {
      this.showCloud = false;
      this.showWebApp = false;
      this.showWebsite = false;
      this.showProduct = true;
      this.onSelectIt(service);
    }
}
