import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BookingComponent } from './booking/booking/booking.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { StautsComponent } from './status/stauts/stauts.component';
import { StautsViewComponent } from './status/stauts-view/stauts-view.component';
import {Routing} from './app.route'

@NgModule({
  declarations: [
    AppComponent,
    BookingComponent,
    WelcomeComponent,
    StautsComponent,
    StautsViewComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    ReactiveFormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
