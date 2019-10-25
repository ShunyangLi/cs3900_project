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
  constructor(http: HttpClient) {
    super(http);
  }

  public signup(signupInfo: SignUpInfo): Observable<{}> {
    console.log('submitted data: ');
    console.log(signupInfo);
    return this.httpPost(signupInfo, this.path);
  }
}
