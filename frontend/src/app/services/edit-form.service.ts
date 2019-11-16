import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { tap, map } from 'rxjs/operators';
import {GridDataResult} from '@progress/kendo-angular-grid';
import {ListingInfo} from '../listingman/listingInfo';

@Injectable({
  providedIn: 'root'
})
export class EditFormService extends BehaviorSubject<GridDataResult> {

  url = 'http://nomoreprojectpls.com';
  path = '/hotel/management';
  roomPath = '/room/management';
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

  public readRoom(token: string, hotelId: string) {
    this.getAllRoom(token, hotelId).subscribe(dt => super.next(dt));
  }

  public getAllRoom(token: string, hotelId: string) {
    this.loading = true;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
      body: {
        hotel_id: hotelId
      }
    };
    return this.http.get(this.url + this.roomPath, options).pipe(map(res => ({
      // @ts-ignore
      data: res.res,
      total: 100
      } as GridDataResult)),
      tap(() => this.loading = false));
  }

  // http post and put
  public saveHotel(hotel: ListingInfo, token: string, isNew: boolean) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    };
    const body = JSON.stringify(hotel);
    if (isNew) {
      return this.http.post(this.url + this.path, body, options);
    } else {
      console.log(body);
      return this.http.put(this.url + this.path, body, options);
    }

  }

  // http delete
  public remove(hotelId: string, token: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      }),
      body: {
        hotel_id: hotelId
      }
    };

    console.log(options);
    return this.http.delete(this.url + this.path, options);
  }
}
