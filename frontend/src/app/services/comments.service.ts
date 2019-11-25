import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  constructor(private http: HttpClient) { }

  public getComments(hotelId: string) {
    const params = new HttpParams().set('hotel_id', hotelId);
    return this.http.get('http://localhost:9000/hotel-review', {params});
  }

  public postComments(review: string, hotelId: string) {
    const tmp = {
      review_info: review,
      hotel_id: hotelId
    };
    return this.http.post('http://localhost:9000/hotel-review', JSON.stringify(tmp), this.httpOptions);
  }
}
