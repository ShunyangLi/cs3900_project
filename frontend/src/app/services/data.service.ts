import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {SearchRes} from '../search-result/searchRes';

@Injectable()
export class DataService {
  public data = new Subject<Array<SearchRes>>();
  message: Array<SearchRes> = [];

  constructor() { }

  public getData() {
    return this.data.asObservable();
  }

  public updateData(result: Array<SearchRes>) {
    this.data.next(result);

  }

}
