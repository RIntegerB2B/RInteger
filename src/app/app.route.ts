import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { BookingComponent} from './booking/booking/booking.component';
import { StautsComponent } from './status/stauts/stauts.component';
import { StautsViewComponent } from './status/stauts-view/stauts-view.component';
import { HeaderComponent } from './home/header/header.component';
import { BannerComponent } from './home/banner/banner.component';
import {NewUserStatusComponent } from './status/new-user-status/new-user-status.component';
import { AboutusComponent} from './home/aboutus/aboutus.component';
import { ContactComponent } from './home/contact/contact.component';
import { StudioComponent } from './home/product/studio/studio.component';
import {ModelBasedBookingComponent} from './model-management/model-based-booking/model-based-booking.component';
import {ViewModelComponent} from './model-management/view-model/view-model.component';
import {SubscribeComponent} from './subscribe/subscribe.component';
import {CatalogingListingBookingComponent} from './cataloging-listing/cataloging-listing-booking/cataloging-listing-booking.component';
import {RegistrationSetupBookingComponent} from './registrationSetup/registration-setup-booking/registration-setup-booking.component';
import {MarketingServicesBookingComponent} from './marketing-services/marketing-services-booking/marketing-services-booking.component';

const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'booking', component: BookingComponent },
    { path: 'status/:id', component: StautsComponent },
    { path: 'statusView/:no', component: StautsViewComponent },
    { path: 'statusView', component: StautsViewComponent },
    { path: 'newUser', component: NewUserStatusComponent },
    { path: 'banner', component: BannerComponent },
    { path: 'aboutUs', component: AboutusComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'studio', component: StudioComponent },
    { path: 'modelBooking/:modelId', component: ModelBasedBookingComponent },
    { path: 'models', component: ViewModelComponent },
    { path: 'subscribe', component: SubscribeComponent },
    { path: 'cataloging', component: CatalogingListingBookingComponent },
    { path: 'registrationSetup', component: RegistrationSetupBookingComponent },
    { path: 'marketingservices', component: MarketingServicesBookingComponent },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
];

export const Routing = RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'});
