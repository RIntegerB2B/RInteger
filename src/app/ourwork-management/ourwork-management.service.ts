import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';
import {  OurWorkModel } from '../shared/viewOurWork.model';


@Injectable({
  providedIn: 'root'
})
export class OurworkManagementService {
  serviceUrl: string = AppSetting.serviceUrl;
  adminServiceUrl: string = AppSetting.adminServiceUrl;
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
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

  fullMainCategory(): Observable<any> {
    const addurl = 'fullmainCategory/';
    const url: string = this.serviceUrl + addurl;
    return this.httpClient.get<OurWorkModel>(url);
  }
  fullSubCategory(id): Observable<any> {
    const addurl = 'subCategory/';
    const url: string = this.serviceUrl + addurl + id;
    return this.httpClient.get<OurWorkModel>(url, id);
  }
}
