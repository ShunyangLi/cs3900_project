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
  /**
   * This service is for get search result
   * @param http connect to backend
   */
  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * search result by location
   * @param location
   */
  public search(location: string): Observable<{}> {
    const params = new HttpParams().set('location', location);
    return this.http.get(this.backendUrl + this.path, {params});
  }

  /**
   * search the room that the hotel contain
   * @param hotelId hotel id
   */
  public searchRoom(hotelId: string): Observable<{}> {
    const params = new HttpParams().set('hotel_id', hotelId);
    return this.http.get(this.backendUrl + this.roomPath, {params});
  }
}
