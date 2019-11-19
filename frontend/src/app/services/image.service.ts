import { Injectable } from '@angular/core';
import {HotelSearchResultInfo} from '../search-result/hotelSearchResultInfo';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  public saveHotelImage(token: string, image: File, h: HotelSearchResultInfo): Observable<{}> {
    console.log(image);
    const options = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        Authorization: token,
        mimeType: 'multipart/form-data'
      })
    };
    const formData = new FormData();
    formData.append('file', image);
    formData.append('hotel_id', h.hotel_id);
    formData.append('hotel_name', h.hotel_name);
    formData.append('hotel_address', h.hotel_address);
    formData.append('description', h.description);
    formData.append('phone', h.phone);
    formData.append('email', h.email);
    return this.http.put('http://nomoreproject.com/hotel/management/', formData, options);
  }

}
