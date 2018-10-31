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
  constructor() { }

  ngOnInit() {
    this.model = true;
  }
  showModel() {
    this.model  = true;
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
  showProduct() {
    this.model  = false;
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
    this.model  = false;
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
    this.model  = false;
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
    this.model  = false;
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
    this.model  = false;
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
    this.model  = false;
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
    this.model  = false;
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
    this.model  = false;
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
    this.model  = false;
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
    this.model  = false;
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
    this.model  = false;
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
