import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
 showIndicator = true;
 fullImages = [ '../../../assets/images/services/silder1.jpg',
     '../../../assets/images/services/silder2.jpg' ,
     '../../../assets/images/services/silder3.jpg',
      '../../../assets/images/services/silder4.jpg' ,
     '../../../assets/images/services/silder5.jpg',
     '../../../assets/images/services/silder6.jpg',
     '../../../assets/images/services/silder7.jpg',
     '../../../assets/images/services/silder8.jpg' ,
     '../../../assets/images/services/silder9.jpg',
     '../../../assets/images/services/silder10.jpg',
      ] ;
  myCarouselOptions = { items: 5, dots: true, nav: true, autoplay: true,
     autoplaySpeed: true, loop: true};
constructor() {
}
switchIndicator(): void {
  this.showIndicator = !this.showIndicator;
}
ngOnInit() {

}

}

