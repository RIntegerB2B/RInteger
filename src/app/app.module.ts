import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { BookingService} from './booking/booking.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { Ng2Webstorage, LocalStorageService } from 'ngx-webstorage';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-bootstrap';
import { AngularFontAwesomeModule} from 'angular-font-awesome';
import { SliderModule } from 'angular-image-slider';
import { DragScrollModule } from 'ngx-drag-scroll';


import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BookingComponent } from './booking/booking/booking.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { StautsComponent } from './status/stauts/stauts.component';
import { StautsViewComponent } from './status/stauts-view/stauts-view.component';
import { Routing } from './app.route';
import { HeaderComponent } from './home/header/header.component';
import { BannerComponent } from './home/banner/banner.component';
import { ProductComponent } from './home/product/product.component';
import { FooterComponent } from './home/footer/footer.component';
import { NewUserStatusComponent } from './status/new-user-status/new-user-status.component';
import { AboutusComponent } from './home/aboutus/aboutus.component';
import { ContactComponent } from './home/contact/contact.component';
import { StudioComponent } from './home/product/studio/studio.component';
import { ModelBasedBookingComponent } from './model-management/model-based-booking/model-based-booking.component';
import { ViewModelComponent } from './model-management/view-model/view-model.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
/* import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule,
   MatInputModule, MatSelectModule } from '@angular/material'; */
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { FormsModule } from '@angular/forms';
import { CatalogingListingBookingComponent } from './cataloging-listing/cataloging-listing-booking/cataloging-listing-booking.component';
import { RegistrationSetupBookingComponent } from './registrationSetup/registration-setup-booking/registration-setup-booking.component';
import { MarketingServicesBookingComponent } from './marketing-services/marketing-services-booking/marketing-services-booking.component';
import { PricingComponent } from './home/pricing/pricing.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import {
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatSnackBarModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatRippleModule,
  MatDialogModule,
  MatChipsModule,
  MatInputModule,
  MatFormFieldModule,
  MatStepperModule
} from '@angular/material';
import {DashBoardService} from './home/dashboard/dashboard.service';

@NgModule({
  declarations: [
    AppComponent,
    BookingComponent,
    WelcomeComponent,
    StautsComponent,
    StautsViewComponent,
    HeaderComponent,
    BannerComponent,
    ProductComponent,
    FooterComponent,
    NewUserStatusComponent,
    AboutusComponent,
    ContactComponent,
    StudioComponent,
    ModelBasedBookingComponent,
    ViewModelComponent,
    SubscribeComponent,
    CatalogingListingBookingComponent,
    RegistrationSetupBookingComponent,
    MarketingServicesBookingComponent,
    PricingComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,      // (Required) for share counts
    HttpClientJsonpModule,
    Routing,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    Ng2Webstorage,
    BrowserAnimationsModule,
    SliderModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    DragScrollModule,
    NgbModule.forRoot(),
    CarouselModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [BookingService,
  LocalStorageService, DashBoardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
