import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {AdsModel} from './ads.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SharedService {

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

   getAdsDetails(): Observable<any> {
    const statusUrl = 'ads/';
    const url: string = this.serviceUrl + statusUrl  ;
    return this.httpClient.get<AdsModel>(url);
  }
}
