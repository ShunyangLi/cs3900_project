import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { tap, map } from 'rxjs/operators';
import {GridDataResult} from '@progress/kendo-angular-grid';

@Injectable({
  providedIn: 'root'
})
export class EditFormService extends BehaviorSubject<GridDataResult> {

  url = 'http://nomoreprojectpls.com';
  path = '/hotel/management';
  loading = false;
  constructor(private http: HttpClient) {
    super(null);
  }

  public read(token: string) {

    // @ts-ignore
    this.getAll(token).subscribe(dt => super.next(dt));
  }

  // http get
  public getAll(token: string): Observable<{}> {
    this.loading = true;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    };
    return this.http.get(this.url + this.path, options).pipe(map(res => ({
        // @ts-ignore
        data: res.res,
        total: 100
      } as GridDataResult)),
      tap(() => this.loading = false));
  }


  // http post and put
  public save() {

  }

  public remove() {

  }
}
