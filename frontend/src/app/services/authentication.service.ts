import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginInfo} from '../login/loginInfo';
import {HttpMethods} from './httpMethods';
// import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends HttpMethods {

  private readonly path = '/auth/login';
  constructor(http: HttpClient) {
    super(http);
  }

  public authenticate(logInInfo: LoginInfo): Observable<{}> {
    return super.httpPost(logInInfo, this.path);
    // const body = JSON.stringify(logInInfo);
    // return this.http.post(this.backendUrl + this.path, body, this.httpOptions);
  }

}