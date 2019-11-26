import { Component, OnInit } from '@angular/core';
import {SignUpInfo} from './signUpInfo';
import {SignupService} from '../services/signup.service';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors
} from '@angular/forms';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  public alreadyRegistered = false;
  public windowOpened = false;
  private signUpInfo: SignUpInfo;
  private secondTypedPwd: string;
  public registerTypes = ['individual', 'enterprise'];

  /**
   * This class is the controller for sign up form web page
   * @param signUpService Http connection service for sign up controller
   *
   */
  constructor(private signUpService: SignupService) {
    this.signUpInfo = new SignUpInfo('', '', '', '', '', 'individual');
  }

  ngOnInit(): void {
  }

  /**
   * The handler for submit the signup information to backend service and navigate to other page
   */
  public onSignUpSubmit(): void {
    this.alreadyRegistered = false;
    this.signUpService.signup(this.signUpInfo).subscribe(
      res => {
        this.openWindow();
      },
      error => {
        this.alreadyRegistered = true;
      }
    );
  }

  /**
   * set window open
   */
  public openWindow(): void {
    this.windowOpened = true;
  }

  public closeWindow(): void {
    this.windowOpened = false;
  }

  /**
   * navigate to login page
   */
  public goLogin(): void {
    window.location.assign('/login');
  }
}
