import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';
import { CustomerLogIn } from '../shared/customer-login.model';
import { Notification } from '../shared/notification.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class RipsilCustomerService {
  serviceUrl: string = AppSetting.serviceUrl;
  operationUrl: string = AppSetting.operationUrl;
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
  signIn(cust: CustomerLogIn) {
    const statusUrl = 'login';
    const url: string = this.operationUrl + statusUrl;
    return this.httpClient.post<CustomerLogIn>(url, cust);
  }
  getDataByMobileNumber(data) {
    const statusUrl = 'statusbymobile';
    const url: string = this.operationUrl + statusUrl;
    return this.httpClient.post<CustomerLogIn>(url, data);
  }
  addPushSubscriber(notificationModel: Notification) {
    const notificationUrl = 'pushnotificationsubscribeforcustomer';
    const url: string = this.operationUrl + notificationUrl;
    return this.http.post(url, notificationModel);
  }
}
