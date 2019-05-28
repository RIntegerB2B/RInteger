import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { AppSetting } from '../config/appSetting';
import {Subscribe} from './subscribe.model';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {
  serviceUrl: string = AppSetting.serviceUrl;
  adminServiceUrl: string = AppSetting.adminServiceUrl;
  operationServiceUrl: string = AppSetting.operationServiceUrl;
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
  addPushSubscriber(subscribe: Subscribe) {
    const notificationUrl = 'pushnotificationsubscribe';
    const url: string = this.adminServiceUrl + notificationUrl;
    return this.http.post(url, subscribe);
  }
  addPushSubscriberOperation(subscribe: Subscribe) {
    const notificationUrl = 'pushnotificationsubscribe';
    const url: string = this.operationServiceUrl + notificationUrl;
    return this.http.post(url, subscribe);
  }
}
