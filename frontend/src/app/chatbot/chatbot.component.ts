import { Component, OnInit } from '@angular/core';
import {ChatbotService} from '../services/chatbot.service';
import { ChatMsg } from './chatMsg';
import { Subject, from, merge, Observable } from 'rxjs';
import { switchMap, map, windowCount, scan, take, tap } from 'rxjs/operators';

import { ChatModule, Message, User, Action, ExecuteActionEvent, SendMessageEvent } from '@progress/kendo-angular-conversational-ui';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  providers: [ChatbotService]
})
export class ChatbotComponent{

  // private userInput: string;
  // private chatMsg: ChatMsg = new ChatMsg('');
  // public response: {} = '';
  public feed: Observable<Message[]>;

  public readonly user: User = {
    id: 1
  };

  public readonly bot: User = {
    id: 0
  };

  private local: Subject<Message> = new Subject<Message>();

  constructor(private chatbotService: ChatbotService) {
    const hello: Message = {
      author: this.bot,
      suggestedActions: [{
        type: 'reply',
        value: 'Neat!'
      }, {
        type: 'reply',
        value: 'Thanks, but this is boring.'
      }],
      timestamp: new Date(),
      text: 'Hello, this is a demo bot. I don`t do much, but I can count symbols!'
    };

// // Merge local and remote messages into a single stream
//     this.feed = merge(
//       from([ hello ]),
//       this.local,
//       this.svc.responses.pipe(
//         map((response): Message => ({
//           author: this.bot,
//           text: response
//         })
//       ))
//     ).pipe(
//       // ... and emit an array of all messages
//       scan((acc: Message[], x: Message) => [...acc, x], [])
//     );
//   }

//   public sendMessage(e: SendMessageEvent): void {
//     this.local.next(e.message);

//     this.local.next({
//       author: this.bot,
//       typing: true
//     });

//     this.svc.submit(e.message.text);
//   }

  // onClick(): void {
  //   this.chatMsg.message = this.userInput;
  //   this.chatbotService.sendMsg(this.chatMsg).subscribe(
  //     res => {
  //       this.response = res;
  //       console.log('response:' + this.response);
  //     }
  //   );

  }
}
