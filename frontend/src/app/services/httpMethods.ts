import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export abstract class HttpMethods {
  protected readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  // protected readonly backendUrl = 'http://nomoreprojectpls.com';
  protected readonly backendUrl = 'http://127.0.0.1:9000/';
  private http: HttpClient;

  protected constructor(http: HttpClient) {
    this.http = http;
  }

  public httpPost(obj: any, path: string): Observable<{}> {
    const body = JSON.stringify(obj);
    console.log(body);
    return this.http.post(this.backendUrl + path, body, this.httpOptions);
  }

  public httpGet(path: string): Observable<{}> {
    return this.http.get(this.backendUrl + path, this.httpOptions);
  }
}
