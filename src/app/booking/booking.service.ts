import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';
import { Booking } from '../booking/booking/booking.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BookingService {
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

  addBooking(data: Booking): Observable<any> {
    const bookurl = 'booking/';
    const url: string = this.serviceUrl + bookurl;
    return this.httpClient.post<Booking>(url, data);
  }
  addPushSubscriber(sub: any , no: any) {
    const notificationUrl = 'subscribe';
    const url: string = this.serviceUrl + notificationUrl;
    return this.http.post(url, sub, no);
}
}
