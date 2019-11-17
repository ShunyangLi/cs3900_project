import { Injectable } from '@angular/core';
import {HttpMethods} from "./httpMethods";

@Injectable({
  providedIn: 'root'
})
export class RecommendationService extends HttpMethods{

  constructor() { }
}
