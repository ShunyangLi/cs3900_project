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
  constructor(private signUpService: SignupService) {
    this.signUpInfo = new SignUpInfo('', '', '', '', '');
  }

  ngOnInit() {
  }


  public onSignUpSubmit(): void {
    console.log(this.signUpInfo.firstName);
    console.log(this.signUpInfo.lastName);
    console.log(this.signUpInfo.email);
    console.log(this.signUpInfo.password);
    console.log(this.signUpInfo.registerType);
    this.signUpService.signup(this.signUpInfo).subscribe(
      res => console.log(res)
    );
  }
}
