import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginInfo} from '../login/loginInfo';
import {catchError} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
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

  public authenticate(logInInfo: LoginInfo): Observable<{}> {
    const body = JSON.stringify(logInInfo);
    return this.http.post(this.backendUrl + this.path, body, httpOptions);
      // .pip(
      // catchError()
    // );
  }

}
