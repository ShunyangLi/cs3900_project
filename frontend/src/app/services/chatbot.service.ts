import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpMethods} from './httpMethods';
//import {ChatMsg} from '../chatbot/chatMsg';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  protected readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Response-Type': 'text'
    })
  };
  private backendURL = 'http://127.0.0.1:9000';
  private readonly path = '/chat/';
  constructor(private http: HttpClient) {
  }

  public sendMsg(chatMsg: any): Observable<{}> {
    //this.chatMsg.message = userInput;
    console.log('submitted data: ');
    console.log(chatMsg);

    return this.http.post(this.backendURL + this.path, JSON.stringify(chatMsg), this.httpOptions);
  }
}