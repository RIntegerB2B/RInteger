import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { BookingService} from './booking/booking.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { Ng2Webstorage, LocalStorageService } from 'ngx-webstorage';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-bootstrap';
import { AngularFontAwesomeModule} from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BookingComponent } from './booking/booking/booking.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { StautsComponent } from './status/stauts/stauts.component';
import { StautsViewComponent } from './status/stauts-view/stauts-view.component';
import {Routing} from './app.route';
import { HeaderComponent } from './home/header/header.component';
import { BannerComponent } from './home/banner/banner.component';
import { ProductComponent } from './home/product/product.component';


@NgModule({
  declarations: [
    AppComponent,
    BookingComponent,
    WelcomeComponent,
    StautsComponent,
    StautsViewComponent,
    HeaderComponent,
    BannerComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,      // (Required) for share counts
    HttpClientJsonpModule,
    Routing,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    Ng2Webstorage,
    NgbModule.forRoot(),
    CarouselModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [BookingService,
  LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
