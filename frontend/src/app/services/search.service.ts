import { Injectable } from '@angular/core';
import {SearchReq} from '../homepage/searchReq';
import {HttpMethods} from './httpMethods';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends HttpMethods {
  private  path = '/search/hotel';
  constructor(http: HttpClient) {
    super(http);
  }

  public search(location: string): Observable<{}> {
    const params = new HttpParams().set('location', location);
    return this.http.get('http://nomoreprojectpls.com' + this.path, {params});
  }
}
