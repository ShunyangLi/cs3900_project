import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

export abstract class HttpMethods {
  /**
   * this class is basic for connect backend such as post and get method
   */
  protected readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  protected readonly httpOptionsParams = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    }),
    params: new HttpParams().set('location', 'randwick')
  };

  protected readonly backendUrl = 'http://localhost:9000';
  // protected readonly backendUrl = 'http://127.0.0.1:9000/';
  protected http: HttpClient;

  protected constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * post object to backend
   * @param obj
   * @param path
   */
  public httpPost(obj: any, path: string): Observable<{}> {
    const body = JSON.stringify(obj);
    console.log(body);
    return this.http.post(this.backendUrl + path, body, this.httpOptions);
  }

  /**
   * Get object from backend
   * @param path
   */
  public httpGet(path: string): Observable<{}> {
    return this.http.get(this.backendUrl + path, this.httpOptions);
  }

  // public httpGetWithParams(path: string, params: HttpParams): Observable<{}> {
  //   return this.http.get(this.backendUrl + path, {headers: new HttpHeaders({'Content-Type': 'application/json'}), params});
  // }
}
