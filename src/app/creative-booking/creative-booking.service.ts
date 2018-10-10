import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {Notification} from '../shared/notification.model';
import {Creative} from '../creative-booking/creative.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class CreativeBookingService {
  serviceUrl: string = AppSetting.serviceUrl;
  adminServiceUrl: string = AppSetting.adminServiceUrl;
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

  addBooking(data: Creative): Observable<any> {
    const bookurl = 'creativeBooking/';
    const url: string = this.serviceUrl + bookurl;
    return this.httpClient.post<Creative>(url, data);
  }
  addPushSubscriber(notificationModel: Notification) {
    const notificationUrl = 'pushnotificationsubscribe';
    const url: string = this.adminServiceUrl + notificationUrl;
    return this.http.post(url, notificationModel);
  }
}
