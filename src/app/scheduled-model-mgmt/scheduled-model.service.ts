import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {Notification} from '../shared/notification.model';
import {Model} from './view-scheduled-model/model-detail.model';
import {ScheduledBooking} from './scheduled-booking/scheduled-booking.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ScheduledModelService {
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
   getScheduledModelDetails(): Observable<any> {
    const statusUrl = 'scheduledmodels/';
    const url: string = this.serviceUrl + statusUrl  ;
    return this.httpClient.get<Model>(url);
  }
  modelDetail(id): Observable<any> {
    const statusUrl = 'model/';
    const url: string = this.serviceUrl + statusUrl + id  ;
    return this.httpClient.get<Model>(url);
  }
  addScheduledBooking(data: ScheduledBooking): Observable<any> {
    const bookurl = 'scheduledmodelbooking/';
    const url: string = this.serviceUrl + bookurl;
    return this.httpClient.post<ScheduledBooking>(url, data);
  }
  addPushSubscriber(notificationModel: Notification) {
    const notificationUrl = 'pushnotificationsubscribe';
    const url: string = this.adminServiceUrl + notificationUrl;
    return this.http.post(url, notificationModel);
  }
}
