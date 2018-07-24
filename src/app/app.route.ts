import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome/welcome.component'
import { BookingComponent} from './booking/booking/booking.component';

const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    { path: 'booking', component: BookingComponent },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];

export const Routing = RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'});
