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

  /**
   * this service is for comment of hotel
   * @param http connect to backend
   */
  constructor(private http: HttpClient) { }

  /**
   * get comments of hotel by hotel id
   * @param hotelId hotel id
   */
  public getComments(hotelId: string) {
    const params = new HttpParams().set('hotel_id', hotelId);
    return this.http.get('http://localhost:9000/hotel-review', {params});
  }

  /**
   * post comments to a hotel
   * @param review comments that user write
   * @param hotelId hotel id
   */
  public postComments(review: string, hotelId: string) {
    const tmp = {
      review_info: review,
      hotel_id: hotelId
    };
    return this.http.post('http://localhost:9000/hotel-review', JSON.stringify(tmp), this.httpOptions);
  }
}
