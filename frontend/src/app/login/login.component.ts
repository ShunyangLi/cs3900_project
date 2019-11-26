import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import { LoginInfo } from './loginInfo';
import {Router, ParamMap, ActivatedRoute, Route} from '@angular/router';

// import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})

export class LoginComponent implements OnInit {
  // two-way binding variable:
  private loginInfo: LoginInfo;
  public authFailed = false;

  /**
   * This class is the controller for login form web page
   * @param authService Http connection service for authentication
   * @param route for navigate to others url
   */
  constructor(private authService: AuthenticationService, private route: Router) {
    this.loginInfo = new LoginInfo('', '');
  }

  /**
   * Initialisation the user token if already login assign to profile
   */
  ngOnInit() {
    if (window.localStorage.getItem('token')) {
      window.location.assign('/profile');
    }
  }

  /**
   * The handler for submitting the login info to backend
   * then set the token in localstorage and jump to the profile page
   *
   */
  public onLogInSubmit(): void {
    this.authFailed = false;
    this.authService.authenticate(this.loginInfo).subscribe(
      res => {
        // tslint:disable-next-line:no-string-literal
        window.localStorage.setItem('token', res['token']);
        // console.log(res);
        setTimeout(() => {
          window.location.assign('/profile');
        }, 1000);
      },
      error => {
        this.authFailed = true;
        // console.log(error);
      }
    );
  }
}
