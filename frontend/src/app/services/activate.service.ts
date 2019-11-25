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

  /**
   * This class is for activate account
   * @param http httpClient for connection backend service
   */
  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * Post user's token to backend
   * @param token user's token
   */
  public activate(token: Token): Observable<{}> {
    return this.httpPost(token, this.path);
  }
}
