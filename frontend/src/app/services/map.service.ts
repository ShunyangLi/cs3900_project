import { Injectable } from '@angular/core';
import {HttpMethods} from './httpMethods';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService extends HttpMethods {

  private readonly path = '/hotel-info';

  /**
   * This service is for get the hotel information of Map
   * @param http connect to backend
   */
  constructor(http: HttpClient) {
    super(http);
  }

  public getAllHotels(): Observable<{}> {
    return this.httpGet(this.path);
  }

}
