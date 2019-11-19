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
    console.log(token);
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
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: token,
        // mimeType: 'multipart/form-data'
      }),
      // content: formData
    };
    return this.http.put('http://nomoreprojectpls.com/hotel/management/', JSON.stringify(formData), options);
  }

}
