import { Injectable } from '@angular/core';
import {SearchInfo} from '../homepage/SearchInfo';
import {HttpMethods} from './httpMethods';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends HttpMethods {
  private  path = '/booking/search';
  constructor(http: HttpClient) {
    super(http);
  }

  public search(searchInfo: SearchInfo): Observable<{}> {
    console.log('submitted data: ');
    console.log(searchInfo);
    return this.httpPost(searchInfo, this.path);
  }
}
