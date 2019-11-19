import { Injectable } from '@angular/core';
import {SearchReq} from '../homepage/searchReq';
import {HttpMethods} from './httpMethods';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends HttpMethods {
  // @ts-ignore
  backendUrl = 'http://nomoreprojectpls.com';
  private  path = '/search/hotel';
  roomPath = '/search/room';
  constructor(http: HttpClient) {
    super(http);
  }

  public search(location: string): Observable<{}> {
    const params = new HttpParams().set('location', location);
    return this.http.get(this.backendUrl + this.path, {params});
  }

  public searchRoom(hotelId: string): Observable<{}> {
    const params = new HttpParams().set('hotel_id', hotelId);
    return this.http.get(this.backendUrl + this.roomPath, {params});
  }
}
