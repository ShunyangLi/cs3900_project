import { Component, OnInit } from '@angular/core';
import {UserObj} from './userObj';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements OnInit {

  public user: UserObj = new UserObj('toby');
  constructor() { }

  ngOnInit() {
  }

  handleSubmit(): void {
    console.log(this.user.user);
  }

}
