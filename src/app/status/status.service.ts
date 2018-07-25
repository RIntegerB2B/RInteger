import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';
import { Status} from './stauts/status.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StatusService {


  serviceUrl: string = AppSetting.serviceUrl;
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

  getStatus(id): Observable<any> {
    const statusUrl = 'status/';
    const url: string = this.serviceUrl + statusUrl + id ;
    return this.httpClient.get<Status>(url);
  }

  getStatusByNum(id): Observable<any> {
    const statusUrl = 'bookingStatus/';
    const url: string = this.serviceUrl + statusUrl + id ;
    return this.httpClient.get<Status[]>(url);
  }

}
