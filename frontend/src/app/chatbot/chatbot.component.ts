import { Component, OnInit } from '@angular/core';
import {ChatbotService} from '../services/chatbot.service';
import {ActivateService} from '../services/activate.service';
import { ChatMsg } from './chatMsg';
import { ChatBot } from 'angular-ai-chat-bot';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chatbot',
  // templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  providers: [ChatbotService],
  template: `<Chat-bot class="chat-window"
                              [token]="accessToken"
                              [msg]="message"
                              >
               <ng-template>
               </ng-template>
             </Chat-bot>`
})
export class ChatbotComponent implements OnInit {
  public accessToken = 'YOUR_ACCESS_TOKEN';
  public message: Subject<any> = new Subject();

  private userInput: string;
  private chatMsg: ChatMsg = new ChatMsg('');
  public response: {} = '';
  constructor(private chatbotService: ChatbotService) { }

  ngOnInit() {
  }

  onClick(): void {
    // this.response =
    console.log(this.userInput);
    // this.chatMsg.message = '';
    this.chatMsg.message = this.userInput;
    this.chatbotService.sendMsg(this.chatMsg).subscribe(
      res => {
        // console.log(res);
        // console.log(typeof(res));
        this.response = res;
        console.log('response:' + this.response);
        // m = new ChatMsg(res);
      }
      // (res) => {
      //   this.response = res;
      //   console.log('response: ' + this.response);
      // }
    );
    // console.log(this.response);
    // console.log(this.chatbotService.sendMsg(this.userInput));
  }
}
