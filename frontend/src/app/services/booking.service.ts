import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignUpInfo} from "../signup/signUpInfo";
import {Observable} from "rxjs";
import {BookingInfo} from "../booking/BookingInfo";
import {HttpMethods} from "./httpMethods";

@Injectable({
  providedIn: 'root'
})
export class BookingService extends HttpMethods{
  private readonly path = '/auth/booking';
  constructor(http: HttpClient) {
    super(http);
  }
  public booking(bookingInfo: BookingInfo): Observable<{}> {
    console.log('submitted data: ');
    console.log(bookingInfo);
    return this.httpPost(bookingInfo, this.path);
  }
}
