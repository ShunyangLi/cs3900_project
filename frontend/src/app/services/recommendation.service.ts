import { Injectable } from '@angular/core';
import {HttpMethods} from "./httpMethods";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecommendationService extends HttpMethods {
  private readonly path = '/bookingcomForward'

  constructor(http: HttpClient) {
    super(http);
  }
  public RecInfo(): Observable<{}> {
    return this.httpGet(this.path);
  }
}
