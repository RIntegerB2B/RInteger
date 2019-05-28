import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';
import { LocalStorageService } from 'ngx-webstorage';
import { Banner } from './welcome/banner.model';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  serviceUrl: string = AppSetting.serviceUrl;
  headers: Headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8'
  });
  requestOptions: RequestOptions = new RequestOptions({ headers: this.headers });
  loginData: any;

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
  constructor(private http: Http, private httpClient: HttpClient, private localStorageService: LocalStorageService) { }
  findBanner(): Observable<any> {
    const addUrl = 'allmainbannerImage';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Banner[]>(url);
  }
  getLogin() {
    return JSON.parse(sessionStorage.getItem('loginUser'));
  /*   console.log(this.loginData); */
    }
  getLogout() {
    sessionStorage.setItem('loginUser', 'false');
    return sessionStorage.getItem('loginUser');
    /*   console.log(this.loginData); */
      }
}
