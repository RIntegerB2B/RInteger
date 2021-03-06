import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';
import { Status } from './stauts/status.model';
import { StatusDetails } from './new-user-status/status.model';
import { BookingDetail } from './stauts-view/booking-detail.model';
import { CancelledBookingDetail } from './cancelled-status/cancelled-booking.model';
import { Bookings } from './all-status/allStatus.model';
import { CompletedBookings } from './completed-order/completed-order.model';
import { EditingStatus } from '../shared/editing-status.model';
import { CreativeStatus } from '../shared/creative-status.model';
import {Customer} from '../shared/customer.model';
import {RegisterCustomer} from './stauts-view/register-customer.model';
import {DigitalMgmtStatus} from './stauts-view/account-mgmt-status.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  serviceUrl: string = AppSetting.serviceUrl;
  headers: Headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8'
  });
  requestOptions: RequestOptions = new RequestOptions({ headers: this.headers });

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
  constructor(private http: Http, private httpClient: HttpClient) { }

  getBookingStatus(id): Observable<any> {
    const statusUrl = 'bookstatus/';
    const url: string = this.serviceUrl + statusUrl + id;
    return this.httpClient.get<Status>(url);
  }

  getStatus(id): Observable<any> {
    const statusUrl = 'status/';
    const url: string = this.serviceUrl + statusUrl + id;
    return this.httpClient.get<Status>(url);
  }

  getStatusByNum(id): Observable<any> {
    const statusUrl = 'bookingStatus/';
    const url: string = this.serviceUrl + statusUrl + id;
    return this.httpClient.get<Bookings>(url);
  }
  getActiveBookings(id): Observable<any> {
    const statusUrl = 'bookingDetails/';
    const activeUrl = '/active/';
    const url: string = this.serviceUrl + statusUrl + id + activeUrl;
    return this.httpClient.get<BookingDetail>(url);
  }
  getCancelledBookings(id): Observable<any> {
    const statusUrl = 'bookingDetails/';
    const cancelUrl = '/cancelled/';
    const url: string = this.serviceUrl + statusUrl + id + cancelUrl;
    return this.httpClient.get<CancelledBookingDetail>(url);
  }
  getCompletedOrders(id): Observable<any> {
    const statusUrl = 'order/';
    const cancelUrl = '/completed/';
    const url: string = this.serviceUrl + statusUrl + id + cancelUrl;
    return this.httpClient.get<CompletedBookings>(url);
  }
  getStatusById(no, id): Observable<any> {
    const statusUrl = 'bookingStatus/';
    const viewUrl = '/view/';
    const url: string = this.serviceUrl + statusUrl + no + viewUrl + id;
    return this.httpClient.get<Status>(url);
  }
  getBookingDetail(id, type): Observable<any> {
    const statusUrl = 'bookingDetails/';
    const viewUrl = '/view/';
    const url: string = this.serviceUrl + statusUrl + id + viewUrl + type;
    return this.httpClient.get<BookingDetail>(url);
  }
  editingStatus(id): Observable<any> {
    const statusUrl = 'editingStatus/';
    const url: string = this.serviceUrl + statusUrl + id;
    return this.httpClient.get<EditingStatus>(url);
  }
  creativeStatus(id): Observable<any> {
    const statusUrl = 'creativeStatus/';
    const url: string = this.serviceUrl + statusUrl + id;
    return this.httpClient.get<CreativeStatus>(url);
  }
  catalogStatus(id): Observable<any> {
    const statusUrl = 'catalogStatus/';
    const url: string = this.serviceUrl + statusUrl + id;
    return this.httpClient.get<CreativeStatus>(url);
  }
  registrationStatus(id): Observable<any> {
    const statusUrl = 'registrationStatus/';
    const url: string = this.serviceUrl + statusUrl + id;
    return this.httpClient.get<CreativeStatus>(url);
  }
  aplusStatus(id): Observable<any> {
    const statusUrl = 'aplusStatus/';
    const url: string = this.serviceUrl + statusUrl + id;
    return this.httpClient.get<CreativeStatus>(url);
  }

  userRegister(cust: RegisterCustomer) {
    const statusUrl = 'register';
    const url: string = this.serviceUrl + statusUrl;
    return this.httpClient.post<RegisterCustomer>(url, cust);
  }
  signIn(cust: RegisterCustomer) {
    const statusUrl = 'signin';
    const url: string = this.serviceUrl + statusUrl;
    return this.httpClient.post<RegisterCustomer>(url, cust);
  }
  getAccountMgmtStatus(id): Observable<any> {
    const statusUrl = 'accountmgmtstatus/';
    const url: string = this.serviceUrl + statusUrl + id;
    return this.httpClient.get<DigitalMgmtStatus>(url);
  }
}
