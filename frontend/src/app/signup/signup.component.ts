import { Component, OnInit } from '@angular/core';
import {SignUpInfo} from './signUpInfo';
import {SignupService} from '../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private signUpInfo: SignUpInfo;
  private secondTypedPwd: string;
  public registerTypes = ['individual', 'enterprise'];
  constructor(private signUpService: SignupService) {
    this.signUpInfo = new SignUpInfo('', '', '', '', '', 'individual');
  }

  ngOnInit() {
  }


  public onSignUpSubmit(): void {
    console.log(this.signUpInfo.first_name);
    console.log(this.signUpInfo.last_name);
    console.log(this.signUpInfo.username);
    console.log(this.signUpInfo.password);
    console.log(this.signUpInfo.birthday)
    console.log(this.signUpInfo.type);
    this.signUpService.signup(this.signUpInfo).subscribe(
      res => console.log(res)
    );
  }
}
