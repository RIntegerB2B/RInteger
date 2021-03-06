import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {Model} from './view-model/model.model';
import {ServiceProviders} from './view-model/service-provider.model';
import {ModelBooking} from './model-based-booking/model-booking.model';
import { CustomerDetail } from './model-based-booking/customer-detail.model';
import {ModelDetail} from './model-based-booking/model.model';
import {Notification} from '../shared/notification.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ModelManagementService {
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
 /*  bookingNotification(): Observable<any> {
    const statusUrl = 'pushnotification/';
    const url: string = this.serviceUrl + statusUrl ;
    return this.httpClient.get<Model>(url);
  } */
  getModelDetails(id): Observable<any> {
    const statusUrl = 'modelDetails/';
    const url: string = this.serviceUrl + statusUrl + id ;
    return this.httpClient.get<Model>(url);
  }
  getAllModels(): Observable<any> {
    const statusUrl = 'models/';
    const url: string = this.serviceUrl + statusUrl ;
    return this.httpClient.get<Model>(url);
  }
  getServiceProviders(): Observable<any> {
    const statusUrl = 'serviceProviders/';
    const url: string = this.serviceUrl + statusUrl  ;
    return this.httpClient.get<ServiceProviders>(url);
  }
 /*  getMenDetails(): Observable<any> {
    const statusUrl = 'menmodels/';
    const url: string = this.serviceUrl + statusUrl  ;
    return this.httpClient.get<Model>(url);
  }
  getWomenDetails(): Observable<any> {
    const statusUrl = 'womenmodels/';
    const url: string = this.serviceUrl + statusUrl  ;
    return this.httpClient.get<Model>(url);
  } */
  getKidsModels(): Observable<any> {
    const statusUrl = 'kidsmodels/';
    const url: string = this.serviceUrl + statusUrl  ;
    return this.httpClient.get<Model>(url);
  }
  getNationalMenModels(): Observable<any> {
    const statusUrl = 'nationalmenmodels/';
    const url: string = this.serviceUrl + statusUrl  ;
    return this.httpClient.get<Model>(url);
  }
  getNationalWomenModels(): Observable<any> {
    const statusUrl = 'nationalwomenmodels/';
    const url: string = this.serviceUrl + statusUrl  ;
    return this.httpClient.get<Model>(url);
  }
  getInterNationalMenModels(): Observable<any> {
    const statusUrl = 'internationalmenmodels/';
    const url: string = this.serviceUrl + statusUrl  ;
    return this.httpClient.get<Model>(url);
  }
  getInterNationalWomenModels(): Observable<any> {
    const statusUrl = 'internationalwomenmodels/';
    const url: string = this.serviceUrl + statusUrl  ;
    return this.httpClient.get<Model>(url);
  }
  // model detail
  modelDetail(id): Observable<any> {
    const statusUrl = 'model/';
    const url: string = this.serviceUrl + statusUrl + id  ;
    return this.httpClient.get<ModelDetail>(url);
  }
  addModelBooking(data: ModelBooking): Observable<any> {
    const bookurl = 'modelbooking/';
    const url: string = this.serviceUrl + bookurl;
    return this.httpClient.post<ModelBooking>(url, data);
  }
  addCustomerDetail(cust: CustomerDetail) {
    const notificationUrl = 'customer';
    const url: string = this.serviceUrl + notificationUrl;
    return this.http.post(url, cust);
  }
  addPushSubscriber(notificationModel: Notification) {
    const notificationUrl = 'pushnotificationsubscribe';
    const url: string = this.adminServiceUrl + notificationUrl;
    return this.http.post(url, notificationModel);
  }
}
