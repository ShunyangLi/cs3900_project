import { Component, OnInit } from '@angular/core';
import {SignUpInfo} from './signUpInfo';
import {SignupService} from '../services/signup.service';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors

} from '@angular/forms';


function matchValues(
  matchTo: string // name of the control to match to
): (AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    return !!control.parent &&
    !!control.parent.value &&
    control.value === control.parent.controls[matchTo].value
      ? null
      : { isMatching: false };
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  private signUpInfo: SignUpInfo;
  private secondTypedPwd: string;
  public registerTypes = ['individual', 'enterprise'];
  constructor(private signUpService: SignupService, private formBuilder: FormBuilder) {
    this.signUpInfo = new SignUpInfo('', '', '', '', '', 'individual');
  }

  ngOnInit(): void {

  }


  public onSignUpSubmit(): void {
    console.log(this.signUpInfo.first_name);
    console.log(this.signUpInfo.last_name);
    console.log(this.signUpInfo.username);
    console.log(this.signUpInfo.password);
    console.log(this.signUpInfo.birthday);
    console.log(this.signUpInfo.type);
    this.signUpService.signup(this.signUpInfo).subscribe(
      res => console.log(res)
    );
  }


}
