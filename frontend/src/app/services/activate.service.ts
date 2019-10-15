import { Injectable } from '@angular/core';
import {HttpMethods} from './httpMethods';
import {HttpClient} from '@angular/common/http';
import {SignUpInfo} from '../signup/signUpInfo';
import {Observable} from 'rxjs';
import {Token} from '../activate/token';

@Injectable({
  providedIn: 'root'
})
export class ActivateService extends HttpMethods {

  private readonly path = '/auth/activate';
  constructor(http: HttpClient) {
    super(http);
  }

  public activate(token: Token): Observable<{}> {
    return this.httpPost(token, this.path);
  }
}
