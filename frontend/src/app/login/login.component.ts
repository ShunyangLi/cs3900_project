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
  constructor(private authService: AuthenticationService, private route: Router) {
    this.loginInfo = new LoginInfo('', '');
  }

  ngOnInit() {
    if (window.localStorage.getItem('token')) {
      window.location.assign('/profile');
    }
  }

  public onLogInSubmit(): void {
    this.authFailed = false;
    this.authService.authenticate(this.loginInfo).subscribe(
      res => {
        // tslint:disable-next-line:no-string-literal
        window.localStorage.setItem('token', res['token']);
        console.log(res);
        setTimeout(() => {
          window.location.assign('/profile');
        }, 1000);
      },
      error => {
        this.authFailed = true;
        console.log(error);
      }
    );
  }
}
