import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { BookingComponent } from './booking/booking/booking.component';
import { StautsComponent } from './status/stauts/stauts.component';
import { StautsViewComponent } from './status/stauts-view/stauts-view.component';
import { HeaderComponent } from './home/header/header.component';
import { BannerComponent } from './home/banner/banner.component';
import { NewUserStatusComponent } from './status/new-user-status/new-user-status.component';
import { AboutusComponent } from './home/aboutus/aboutus.component';
import { ContactComponent } from './home/contact/contact.component';
import { StudioComponent } from './home/product/studio/studio.component';
import { ModelBasedBookingComponent } from './model-management/model-based-booking/model-based-booking.component';
import { ViewModelComponent } from './model-management/view-model/view-model.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { PricingComponent } from './home/pricing/pricing.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { CatalogingListingBookingComponent } from './cataloging-listing/cataloging-listing-booking/cataloging-listing-booking.component';
import { RegistrationSetupBookingComponent } from './registrationSetup/registration-setup-booking/registration-setup-booking.component';
import { MarketingServicesBookingComponent } from './marketing-services/marketing-services-booking/marketing-services-booking.component';
import { ImageEditingBookingComponent } from './image-editing-booking/image-editing-booking.component';
import { CreativeBookingComponent } from './creative-booking/creative-booking.component';
import { CancelledStatusComponent } from './status/cancelled-status/cancelled-status.component';
import { AllStatusComponent } from './status/all-status/all-status.component';
import { CompletedOrderComponent } from './status/completed-order/completed-order.component';
import { PortfolioComponent } from './home/portfolio/portfolio.component';
import { CreativePortfolioComponent } from './home/creative-portfolio/creative-portfolio.component';
import { VideoPortfolioComponent } from './home/video-portfolio/video-portfolio.component';
import { ItServicesPortfolioComponent } from './home/it-services-portfolio/it-services-portfolio.component';
import { DigitalMarketingPortfolioComponent } from './home/digital-marketing-portfolio/digital-marketing-portfolio.component';
import { AplusBookingComponent } from './aplus-booking/aplus-booking.component';
import { ItServicesBookingComponent } from './it-services-booking/it-services-booking.component';
import { DigitalMgmtBookingComponent } from './digital-mgmt-booking/digital-mgmt-booking.component';
import { ViewScheduledModelComponent } from './scheduled-model-mgmt/view-scheduled-model/view-scheduled-model.component';
import { ScheduledBookingComponent } from './scheduled-model-mgmt/scheduled-booking/scheduled-booking.component';
import { DigitalMgmtComponent } from './home/product/digital-mgmt/digital-mgmt.component';
import { ItServicesComponent } from './home/product/it-services/it-services.component';
import { AccountMgmtStatusComponent } from './status/account-mgmt-status/account-mgmt-status.component';
import { ProgressBarComponent } from './home/progress-bar/progress-bar.component';
import {ViewProjectionModelComponent} from './scheduled-model-mgmt/view-projection-model/view-projection-model.component';
import { OurworkComponent } from './ourwork-management/ourwork/ourwork.component';
import { ViewdetailsComponent } from './ourwork-management/viewdetails/viewdetails.component';
import {StudioTourComponent} from './home/studio-tour/studio-tour.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'aboutUs', component: AboutusComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'studio', component: StudioComponent },
  { path: 'subscribe', component: SubscribeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'digitalmarketingportfolio', component: DigitalMarketingPortfolioComponent },
  { path: 'creativeportfolio', component: CreativePortfolioComponent },
  { path: 'videoportfolio', component: VideoPortfolioComponent },
  { path: 'itportfolio', component: ItServicesPortfolioComponent },
  { path: 'digitalmgmtservice', component: DigitalMgmtComponent },
  { path: 'itservicesdetails', component: ItServicesComponent },
  { path: 'pricing/:viewid', component: PricingComponent },
  { path: 'studiotour', component: StudioTourComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'editing/:viewid', component: ImageEditingBookingComponent },
      { path: 'accmgmtstatus/:data', component: AccountMgmtStatusComponent },
      { path: 'creative/:viewid', component: CreativeBookingComponent },
      /* { path: 'header', component: HeaderComponent }, */
      { path: 'booking/:viewid', component: BookingComponent },
      { path: 'status/:id', component: StautsComponent },
      { path: 'statusView/:viewid/:no', component: StautsViewComponent },
      { path: 'cancelled/:viewid', component: CancelledStatusComponent },
      { path: 'bookingstatus/:viewid', component: AllStatusComponent },
      { path: 'statusView/:viewid', component: StautsViewComponent },
      { path: 'newUser/:viewid', component: NewUserStatusComponent },
      /* { path: 'aboutUs', component: AboutusComponent }, */
      /*   { path: 'contact', component: ContactComponent }, */
      /* { path: 'studio', component: StudioComponent }, */
      { path: 'modelBooking/:modelId', component: ModelBasedBookingComponent },
      { path: 'models/:viewid', component: ViewModelComponent },
      /* { path: 'subscribe', component: SubscribeComponent }, */
      { path: 'cataloging/:viewid', component: CatalogingListingBookingComponent },
      { path: 'completed/:viewid', component: CompletedOrderComponent },
      { path: 'aplus/:viewid', component: AplusBookingComponent },
      { path: 'registrationSetup/:viewid', component: RegistrationSetupBookingComponent },
      { path: 'marketingservices/:viewid', component: MarketingServicesBookingComponent },
      { path: 'itservices/:viewid', component: ItServicesBookingComponent },
      { path: 'digitalmgmt/:viewid', component: DigitalMgmtBookingComponent },
      { path: 'pricing/:viewid', component: PricingComponent },
      { path: 'viewschedulemodel/:viewid', component: ViewScheduledModelComponent },
      { path: 'viewprojectionmodel/:viewid', component: ViewProjectionModelComponent },
      { path: 'scheduledmodelBooking/:modelId', component: ScheduledBookingComponent },
      /* { path: 'ourwork/:viewid', component: OurworkComponent}, */
      { path: 'ourwork/:viewid/:subid', component: OurworkComponent},
      { path: 'allourwork/:mainid/:subid', component: ViewdetailsComponent }
    ]
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
];

export const Routing = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' });
