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
  loginData: boolean;
  serviceUrl: string = AppSetting.serviceUrl;
  constructor(private http: Http, private httpClient: HttpClient, private localStorageService: LocalStorageService) { }
  findBanner(): Observable<any> {
    const addUrl = 'allmainbannerImage';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Banner[]>(url);
  }
  getLogin() {
   return this.loginData = JSON.parse(sessionStorage.getItem('loginUser'));
  /*   console.log(this.loginData); */
    }
  getLogout() {
    sessionStorage.setItem('loginUser', 'false');
    return sessionStorage.getItem('loginUser');
    /*   console.log(this.loginData); */
      }
}
