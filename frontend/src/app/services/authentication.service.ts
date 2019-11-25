import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginInfo} from '../login/loginInfo';
import {HttpMethods} from './httpMethods';
// import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends HttpMethods {

  private readonly path = '/auth/login';
  /**
   * This class is for login
   * @param http httpClient for connection backend service
   */
  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * post the login information to backend service
   * @param logInInfo
   */
  public authenticate(logInInfo: LoginInfo): Observable<{}> {
    return super.httpPost(logInInfo, this.path);
    // const body = JSON.stringify(logInInfo);
    // return this.http.post(this.backendUrl + this.path, body, this.httpOptions);
  }

  /**
   * get the user profile from backend
   * @param token user's token
   */
  public auth(token: string): Observable<{}> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    };
    return this.http.get(this.backendUrl + '/auth/profile', options);
  }

}
