import { Injectable } from '@angular/core';
import {HotelSearchResultInfo} from '../search-result/hotelSearchResultInfo';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpMethods} from './httpMethods';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  /**
   * this service is for update image
   * @param http
   */
  constructor(private http: HttpClient) {}

  /**
   * save the hotel image
   * @param token
   * @param image
   * @param h hotel search result
   */
  public saveHotelImage(token: string, image: File, h: HotelSearchResultInfo): Observable<{}> {
    const formData = new FormData();
    formData.append('hotel_id', h.hotel_id);
    formData.append('hotel_name', h.hotel_name);
    formData.append('hotel_address', h.hotel_address);
    formData.append('description', h.description);
    formData.append('phone', h.phone);
    formData.append('email', h.email);
    formData.append('file', image);
    // console.log(formData.entries());
    // for (const key of formData.entries()) { console.log(key[0] + ', ' + key[1]); }
    const options = {
      headers: new HttpHeaders({
        Authorization: token,
        'Content-Type': 'application/json',
      }),
      data: formData
    };
    // console.log(options.headers);
    return this.http.put('http://127.0.0.1:9000/hotel/management', options);
  }

}
