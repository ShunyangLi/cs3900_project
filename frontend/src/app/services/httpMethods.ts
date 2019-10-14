import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export abstract class HttpMethods {
  protected readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  protected readonly backendUrl = 'http://nomoreprojectpls.com';
  private http: HttpClient;

  protected constructor(http: HttpClient) {
    this.http = http;
  }

  public httpPost(obj: any, path: string): Observable<{}> {
    const body = JSON.stringify(obj);
    return this.http.post(this.backendUrl + path, body, this.httpOptions);
  }

}
