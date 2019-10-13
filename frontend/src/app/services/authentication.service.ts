import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly backendUrl;
  private readonly path;
  constructor(private http: HttpClient) {
    this.backendUrl = 'http://nomoreprojectpls.com';
    this.path = '/auth/login';
  }

  public authenticate(authInfo: HttpParams): Observable<{}> {
    return this.http.post(this.backendUrl + this.path, authInfo, httpOptions);
    // TODO: add error handling: .pipe(catchError())
  }

}
