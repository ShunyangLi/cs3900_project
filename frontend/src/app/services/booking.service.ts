import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
// import {BookingInfo} from '../booking/BookingInfo';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(http: HttpClient) {
  }

  // public checkAva(): Observable<{}> {
  // }
}
