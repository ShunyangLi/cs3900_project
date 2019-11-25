import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CheckAvaData} from '../rooms/checkAvaData';
import {BookingInfo} from "../booking/BookingInfo";
// import {BookingInfo} from '../booking/BookingInfo';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  protected readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  /**
   * This class is for booking
   * @param http httpClient for connection backend service
   */
  constructor(private http: HttpClient) {
  }

  /**
   * check weather room available
   * @param check data
   */
  public checkAva(check: CheckAvaData): Observable<{}> {
    return this.http.post('http://nomoreprojectpls.com/check-availability/', JSON.stringify(check), this.httpOptions);
  }

  /**
   * send book request to backend
   * @param b the booking information
   */
  public book(b: BookingInfo): Observable<{}> {
    return this.http.post('http://nomoreprojectpls.com/booking/', JSON.stringify(b), this.httpOptions);
  }
}
