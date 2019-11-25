import { Injectable } from '@angular/core';
import {HttpMethods} from "./httpMethods";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecommendationService extends HttpMethods {
  private readonly path = '/bookingcomForward'
  /**
   * This service is for get the hotel recommendation
   * @param http connect to backend
   */
  constructor(http: HttpClient) {
    super(http);
  }
  public RecInfo(): Observable<{}> {
    return this.httpGet(this.path);
  }
}
