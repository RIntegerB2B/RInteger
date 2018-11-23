import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
/*   modelImages = ['../../../assets/images/meghna.jpg', '../../../assets/images/meghna.jpg',
  '../../../assets/images/meghna.jpg', '../../../assets/images/meghna.jpg']; */
  adImages = ['../../../assets/images/ads/1.jpg', '../../../assets/images/ads/2.jpg'];
  bannersocialImages = ['../../../assets/images/bannersocial/1.jpg', '../../../assets/images/bannersocial/2.jpg',
   '../../../assets/images/bannersocial/3.jpg',
  '../../../assets/images/bannersocial/4.jpg'];
  brandImages = ['../../../assets/images/brandimg/1.jpg', '../../../assets/images/brandimg/2.jpg',
  '../../../assets/images/brandimg/3.jpg',
 '../../../assets/images/brandimg/4.jpg'];
 brochureImages = ['../../../assets/images/brochure/1.jpg'];
 catalogImages = ['../../../assets/images/catalog/1.jpg', '../../../assets/images/catalog/2.jpg',
 '../../../assets/images/catalog/3.jpg',
'../../../assets/images/catalog/4.jpg',
'../../../assets/images/catalog/5.jpg',
'../../../assets/images/catalog/6.jpg'];
 exhibitionImages = ['../../../assets/images/exhibitionpages/1.jpg', '../../../assets/images/exhibitionpages/2.jpg'];
 fashionImages = ['../../../assets/images/fashion/1.jpg', '../../../assets/images/fashion/2.jpg',
 '../../../assets/images/fashion/3.jpg',
'../../../assets/images/fashion/4.jpg',
'../../../assets/images/fashion/5.jpg',
'../../../assets/images/fashion/6.jpg',
'../../../assets/images/fashion/7.jpg'
];
lookBookImages = ['../../../assets/images/lookbook/1.jpg', '../../../assets/images/lookbook/2.jpg',
'../../../assets/images/lookbook/3.jpg',
'../../../assets/images/lookbook/4.jpg',
'../../../assets/images/lookbook/5.jpg',
'../../../assets/images/lookbook/6.jpg',
'../../../assets/images/lookbook/7.jpg',
'../../../assets/images/lookbook/8.jpg'
];
testImages = ['../../../assets/images/test/1.jpg', '../../../assets/images/test/2.jpg',
'../../../assets/images/test/3.jpg'
];
promotionalImages = ['../../../assets/images/promotional/1.jpg', '../../../assets/images/promotional/2.jpg'
];
socialImages = ['../../../assets/images/social/1.jpg', '../../../assets/images/social/2.jpg',
'../../../assets/images/social/3.jpg', '../../../assets/images/social/4.jpg'
];
  ad: boolean;
  bannersocial: boolean;
  brandimage: boolean;
  catalog: boolean;
  brochure: boolean;
  overview: boolean;
  exhibition: boolean;
  fashion: boolean;
  lookbook: boolean;
  promotional: boolean;
  socialposting: boolean;
  constructor() { }

  ngOnInit() {
    this.ad = true;
  }
  showOverView() {
    this.ad = false;
this.bannersocial = false;
this.brandimage = false;
this.brochure = false;
this.catalog = false;
this.overview = true;
this.exhibition = false;
this.fashion = false;
this.lookbook = false;
this.promotional = false;
this.socialposting = false;
  }
  showAd() {
this.ad = true;
this.bannersocial = false;
this.brandimage = false;
this.brochure = false;
this.catalog = false;
this.overview = false;
this.exhibition = false;
this.fashion = false;
this.lookbook = false;
this.promotional = false;
this.socialposting = false;
  }
  showBannerSocial() {
    this.ad = false;
    this.bannersocial = true;
    this.brandimage = false;
    this.brochure = false;
    this.catalog = false;
    this.overview = false;
    this.exhibition = false;
    this.fashion = false;
    this.lookbook = false;
    this.promotional = false;
    this.socialposting = false;
  }
  showBrandImage() {
    this.ad = false;
this.bannersocial = false;
this.brandimage = true;
this.brochure = false;
this.catalog = false;
this.overview = false;
this.exhibition = false;
this.fashion = false;
this.lookbook = false;
this.promotional = false;
this.socialposting = false;
  }
  showBrochure() {
    this.ad = false;
this.bannersocial = false;
this.brandimage = false;
this.brochure = true;
this.catalog = false;
this.overview = false;
this.exhibition = false;
this.fashion = false;
this.lookbook = false;
this.promotional = false;
this.socialposting = false;
  }
  showCatalog() {
  this.ad = false;
this.bannersocial = false;
this.brandimage = false;
this.brochure = false;
this.catalog = true;
this.overview = false;
this.exhibition = false;
this.fashion = false;
this.lookbook = false;
this.promotional = false;
this.socialposting = false;
  }
  showExhibition() {
    this.ad = false;
  this.bannersocial = false;
  this.brandimage = false;
  this.brochure = false;
  this.catalog = false;
  this.overview = false;
  this.exhibition = true;
  this.fashion = false;
  this.lookbook = false;
  this.promotional = false;
  this.socialposting = false;
    }
    showFashion() {
      this.ad = false;
    this.bannersocial = false;
    this.brandimage = false;
    this.brochure = false;
    this.catalog = false;
    this.overview = false;
    this.exhibition = false;
    this.fashion = true;
    this.lookbook = false;
    this.promotional = false;
    this.socialposting = false;
      }
      showLookBook() {
        this.ad = false;
      this.bannersocial = false;
      this.brandimage = false;
      this.brochure = false;
      this.catalog = false;
      this.overview = false;
      this.exhibition = false;
      this.fashion = false;
      this.lookbook = true;
      this.promotional = false;
      this.socialposting = false;
        }
        showPromotional() {
          this.ad = false;
        this.bannersocial = false;
        this.brandimage = false;
        this.brochure = false;
        this.catalog = false;
        this.overview = false;
        this.exhibition = false;
        this.fashion = false;
        this.lookbook = false;
        this.promotional = true;
        this.socialposting = false;
          }
          showSocialPosting() {
            this.ad = false;
          this.bannersocial = false;
          this.brandimage = false;
          this.brochure = false;
          this.catalog = false;
          this.overview = false;
          this.exhibition = false;
          this.fashion = false;
          this.lookbook = false;
          this.promotional = false;
          this.socialposting = true;
            }
}
