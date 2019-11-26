import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpMethods} from './httpMethods';
import {SignUpInfo} from '../signup/signUpInfo';


@Injectable({
  providedIn: 'root'
})
export class SignupService extends HttpMethods {

  private readonly path = '/auth/signup';
  /**
   * This service is for sign up
   * @param http connect to backend
   */
  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * post sign information to backend
   * @param signupInfo the user information
   */
  public signup(signupInfo: SignUpInfo): Observable<{}> {
    return this.httpPost(signupInfo, this.path);
  }
}
