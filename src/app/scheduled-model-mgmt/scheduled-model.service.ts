import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {Notification} from '../shared/notification.model';
import {Model} from './view-scheduled-model/model-detail.model';
import {ScheduledBooking} from './scheduled-booking/scheduled-booking.model';
import {Customer} from '../shared/customer.model';

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
  addCustomerDetail(cust: Customer) {
    const notificationUrl = 'customer';
    const url: string = this.serviceUrl + notificationUrl;
    return this.http.post(url, cust);
  }
  getNationalMenModels(): Observable<any> {
    const statusUrl = 'schedulednationalmenmodels/';
    const url: string = this.serviceUrl + statusUrl  ;
    return this.httpClient.get<Model>(url);
  }
  getNationalWomenModels(): Observable<any> {
    const statusUrl = 'schedulednationalwomenmodels/';
    const url: string = this.serviceUrl + statusUrl  ;
    return this.httpClient.get<Model>(url);
  }
  getInterNationalMenModels(): Observable<any> {
    const statusUrl = 'scheduledinternationalmenmodels/';
    const url: string = this.serviceUrl + statusUrl  ;
    return this.httpClient.get<Model>(url);
  }
  getInterNationalWomenModels(): Observable<any> {
    const statusUrl = 'scheduledinternationalwomenmodels/';
    const url: string = this.serviceUrl + statusUrl  ;
    return this.httpClient.get<Model>(url);
  }

  // projection models

  getProjectionModelDetails(): Observable<any> {
    const statusUrl = 'projectionmodels/';
    const url: string = this.serviceUrl + statusUrl  ;
    return this.httpClient.get<Model>(url);
  }

  getProjectionNationalMenModels(): Observable<any> {
    const statusUrl = 'projectionnationalmen/';
    const url: string = this.serviceUrl + statusUrl  ;
    return this.httpClient.get<Model>(url);
  }
  getProjectionNationalWomenModels(): Observable<any> {
    const statusUrl = 'projectionnationalwomen/';
    const url: string = this.serviceUrl + statusUrl  ;
    return this.httpClient.get<Model>(url);
  }
  getProjectionInterNationalMenModels(): Observable<any> {
    const statusUrl = 'projectioninternationalmen/';
    const url: string = this.serviceUrl + statusUrl  ;
    return this.httpClient.get<Model>(url);
  }
  getProjectionInterNationalWomenModels(): Observable<any> {
    const statusUrl = 'projectioninternationalwomen/';
    const url: string = this.serviceUrl + statusUrl  ;
    return this.httpClient.get<Model>(url);
  }
  getProjectionKidModel(): Observable<any> {
    const statusUrl = 'projectionkidsmodels/';
    const url: string = this.serviceUrl + statusUrl  ;
    return this.httpClient.get<Model>(url);
  }
  getScheduledKidModel(): Observable<any> {
    const statusUrl = 'scheduledkidsmodels/';
    const url: string = this.serviceUrl + statusUrl  ;
    return this.httpClient.get<Model>(url);
  }
}
