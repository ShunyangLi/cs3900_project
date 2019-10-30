import { Component, OnInit } from '@angular/core';
import {ChatbotService} from '../services/chatbot.service';
import {ActivateService} from '../services/activate.service';
import { ChatMsg } from './chatMsg';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  providers: [ChatbotService]
})
export class ChatbotComponent implements OnInit {

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
