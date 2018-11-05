import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  model: boolean;
  product: boolean;
  kids: boolean;
  video: boolean;
  client: boolean;
  editing: boolean;
  creative: boolean;
  registration: boolean;
  enhance: boolean;
  marketplace: boolean;
  socialmedia: boolean;
  website: boolean;
  selectedPrice;
  services = [
    { id: 0, name: 'Ecommerce Model Shoot' },
    { id: 1, name: 'Ecommerce Product Shoot' },
    { id: 2, name: 'Ecommerce Kids Shoot' },
    { id: 3, name: 'Ecommerce Video Shoot' },
    { id: 4, name: 'Ecommerce Client Location' },
    { id: 5, name: 'Editing Services' },
    { id: 6, name: 'Creative Shoot Pricing' },
    { id: 7, name: 'Registration & Listing' },
    { id: 8, name: 'Enhance Catalog' },
    { id: 9, name: 'Digital Business Management - Market Place' },
    { id: 10, name: 'Digital Business Management - Social Media' },
    { id: 11, name: 'Website Development' },
  ];
  constructor() { }

  ngOnInit() {
    this.onSelect(this.services[0]);
  }
  showModel() {
    this.model = true;
    this.product = false;
    this.kids = false;
    this.video = false;
    this.client = false;
    this.editing = false;
    this.creative = false;
    this.registration = false;
    this.enhance = false;
    this.marketplace = false;
    this.socialmedia = false;
    this.website = false;

  }


  onSelect(service): void {
    switch (service.id) {
      case 0: {
        this.showModel();
        break;
      }
      case 1: {
        this.showProduct();
        break;
      }
      case 2: {
        this.showKids();
        break;
      }
      case 3: {
        this.showVideo();
        break;
      }
      case 4: {
        this.showClientLocation();
        break;
      }
      case 5: {
        this.showEditing();
        break;
      }
      case 6: {
        this.showCreative();
        break;
      }
      case 7: {
        this.showRegistration();
        break;
      }
      case 8: {
        this.showEnhance();
        break;
      }
      case 9: {
        this.showDBMarketPlace();
        break;
      }
      case 10: {
        this.showDBSocialMedia();
        break;
      }
      case 11: {
        this.showWebsiteDev();
        break;
      }
    }
    this.selectedPrice = service;
  }
  showProduct() {
    this.model = false;
    this.product = true;
    this.kids = false;
    this.video = false;
    this.client = false;
    this.editing = false;
    this.creative = false;
    this.registration = false;
    this.enhance = false;
    this.marketplace = false;
    this.socialmedia = false;
    this.website = false;
  }

  showKids() {
    this.model = false;
    this.product = false;
    this.kids = true;
    this.video = false;
    this.client = false;
    this.editing = false;
    this.creative = false;
    this.registration = false;
    this.enhance = false;
    this.marketplace = false;
    this.socialmedia = false;
    this.website = false;
  }
  showVideo() {
    this.model = false;
    this.product = false;
    this.kids = false;
    this.video = true;
    this.client = false;
    this.editing = false;
    this.creative = false;
    this.registration = false;
    this.enhance = false;
    this.marketplace = false;
    this.socialmedia = false;
    this.website = false;
  }
  showClientLocation() {
    this.model = false;
    this.product = false;
    this.kids = false;
    this.video = false;
    this.client = true;
    this.editing = false;
    this.creative = false;
    this.registration = false;
    this.enhance = false;
    this.marketplace = false;
    this.socialmedia = false;
    this.website = false;
  }
  showEditing() {
    this.model = false;
    this.product = false;
    this.kids = false;
    this.video = false;
    this.client = false;
    this.editing = true;
    this.creative = false;
    this.registration = false;
    this.enhance = false;
    this.marketplace = false;
    this.socialmedia = false;
    this.website = false;
  }
  showCreative() {
    this.model = false;
    this.product = false;
    this.kids = false;
    this.video = false;
    this.client = false;
    this.editing = false;
    this.creative = true;
    this.registration = false;
    this.enhance = false;
    this.marketplace = false;
    this.socialmedia = false;
    this.website = false;
  }
  showRegistration() {
    this.model = false;
    this.product = false;
    this.kids = false;
    this.video = false;
    this.client = false;
    this.editing = false;
    this.creative = false;
    this.registration = true;
    this.enhance = false;
    this.marketplace = false;
    this.socialmedia = false;
    this.website = false;
  }
  showEnhance() {
    this.model = false;
    this.product = false;
    this.kids = false;
    this.video = false;
    this.client = false;
    this.editing = false;
    this.creative = false;
    this.registration = false;
    this.enhance = true;
    this.marketplace = false;
    this.socialmedia = false;
    this.website = false;
  }
  showDBMarketPlace() {
    this.model = false;
    this.product = false;
    this.kids = false;
    this.video = false;
    this.client = false;
    this.editing = false;
    this.creative = false;
    this.registration = false;
    this.enhance = false;
    this.marketplace = true;
    this.socialmedia = false;
    this.website = false;
  }
  showDBSocialMedia() {
    this.model = false;
    this.product = false;
    this.kids = false;
    this.video = false;
    this.client = false;
    this.editing = false;
    this.creative = false;
    this.registration = false;
    this.enhance = false;
    this.marketplace = false;
    this.socialmedia = true;
    this.website = false;
  }
  showWebsiteDev() {
    this.model = false;
    this.product = false;
    this.kids = false;
    this.video = false;
    this.client = false;
    this.editing = false;
    this.creative = false;
    this.registration = false;
    this.enhance = false;
    this.marketplace = false;
    this.socialmedia = false;
    this.website = true;
  }
}
