
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CustomerLogIn } from './../../shared/customer-login.model';
import { AppSetting } from './../../config/appSetting';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  operationServiceUrl: string =  AppSetting.operationServiceUrl;
    constructor(private http: HttpClient) { }

    login(mobileNumber: string, password: string): Observable<any>      {
      const url = this.operationServiceUrl + 'login';
        return this.http.post<CustomerLogIn>(url, { mobileNumber, password });

  }
    logout() {
        // remove user from local storage to log user out
         sessionStorage.removeItem('loginUser');
         sessionStorage.removeItem('token');
    }
}
