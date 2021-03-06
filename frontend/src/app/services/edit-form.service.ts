import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { tap, map } from 'rxjs/operators';
import {GridDataResult} from '@progress/kendo-angular-grid';
import {ListingInfo} from '../listingman/listingInfo';
import {RoomInfo} from '../listingman/roomInfo';

@Injectable({
  providedIn: 'root'
})
export class EditFormService extends BehaviorSubject<GridDataResult> {

  url = 'http://localhost:9000';
  path = '/hotel/management';
  roomPath = '/room/management';
  loading = false;

  /**
   * this service for add remove and edit hotel information
   * @param http connect backend
   */
  constructor(private http: HttpClient) {
    super(null);
  }

  /**
   * get the user's hotel
   * @param token
   */
  public read(token: string) {

    // @ts-ignore
    this.getAll(token).subscribe(dt => super.next(dt));
  }

  /**
   * get user hotel
   * @param token
   */
  public getHotels(token: string): Observable<{}> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    };
    return this.http.get(this.url + this.path, options);
  }

  /**
   * get all result
   * @param token
   */
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

  /**
   * get room of hotel
   * @param token
   * @param hotelId
   */
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
      params: new HttpParams().set('hotel_id', hotelId)
    };
    return this.http.get(this.url + this.roomPath, options).pipe(map(res => ({
      // @ts-ignore
      data: res.res,
      total: 100
      } as GridDataResult)),
      tap(() => this.loading = false));
  }

  /**
   * save the hotel
   * @param hotel hotel information
   * @param token
   * @param isNew check weather is new hotel
   */
  // hotel http post and put
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

  /**
   * save the room
   * @param room room information
   * @param token
   * @param isNewRoom check weather is new room
   */
  // room http post and put
  public saveRoom(room: RoomInfo, token, isNewRoom: boolean) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    };
    const body = JSON.stringify(room);
    if (isNewRoom) {
      return this.http.post(this.url + this.roomPath, body, options);
    } else {
      return this.http.put(this.url + this.roomPath, body, options);
    }
  }
  // hotel http delete
  /**
   * remove the hotel
   * @param hotelId
   * @param token
   */
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

  // room http remove
  /**
   * remove the room of a hotel
   * @param hotelId
   * @param roomId
   * @param token
   */
  public removeRoom(hotelId: string, roomId: string, token: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      }),
      body: {
        hotel_id: hotelId,
        room_id: roomId
      }
    };
    return this.http.delete(this.url + this.roomPath, options);
  }
}
