import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {HotelSearchResultInfo} from '../search-result/hotelSearchResultInfo';

@Injectable()
export class DataService {
  public data = new Subject<Array<HotelSearchResultInfo>>();
  message: Array<HotelSearchResultInfo> = [];

  /**
   * This service control the hotel search result
   */
  constructor() { }

  public getData() {
    return this.data.asObservable();
  }

  /**
   * it will put the search result into the list
   * @param result the search result
   */
  public updateData(result: Array<HotelSearchResultInfo>) {
    this.data.next(result);
  }
}
