import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {HotelSearchResultInfo} from '../search-result/hotelSearchResultInfo';

@Injectable()
export class DataService {
  public data = new Subject<Array<HotelSearchResultInfo>>();
  message: Array<HotelSearchResultInfo> = [];

  constructor() { }

  public getData() {
    return this.data.asObservable();
  }

  public updateData(result: Array<HotelSearchResultInfo>) {
    this.data.next(result);
  }
}
