import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { BookingComponent} from './booking/booking/booking.component';
import { StautsComponent } from './status/stauts/stauts.component';
import { StautsViewComponent } from './status/stauts-view/stauts-view.component';

const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    { path: 'booking', component: BookingComponent },
    { path: 'status/:id', component: StautsComponent },
    { path: 'statusView/:no', component: StautsViewComponent },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];

export const Routing = RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'});
