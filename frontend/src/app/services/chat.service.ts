import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ChatMsg} from '../chatbot/chatMsg';

// Mock remote service

@Injectable()
export class ChatService {

  protected readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Response-Type': 'text'
    })
  };

  public readonly responses: Subject<string> = new Subject<string>();

  private backendURL = 'http://127.0.0.1:9000';
  private readonly path = '/chat/';
  private answer: any;

  /**
   * This service is for chat bot
   * @param http connect to backend
   */
  constructor(private http: HttpClient) {
  }

  /**
   * submit question that user typed to backend api and return answer
   * @param question the user's question
   */
  public submit(question: string): void {
    this.sendMsg(new ChatMsg(question)).subscribe(
      res => {
        this.answer = res;
        this.responses.next(this.answer);
      }
    );

  }

  /**
   * send message
   * @param chatMsg massage that user typed
   */
  public sendMsg(chatMsg: ChatMsg): Observable<{}> {
    // this.chatMsg.message = userInput;
    console.log('submitted data: ');
    console.log(typeof (chatMsg));

    return this.http.post(this.backendURL + this.path, JSON.stringify(chatMsg), this.httpOptions);
  }
}
