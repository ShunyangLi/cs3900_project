import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {SearchRes} from '../search-result/searchRes';

@Injectable()
export class DataService {
  message: Array<SearchRes>
  private messageSource = new BehaviorSubject(this.message) ;
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: Array<SearchRes>) {
    this.messageSource.next(message);
  }

}
