import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import { LoginInfo } from './loginInfo';

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

  constructor(private authService: AuthenticationService) {
    this.loginInfo = new LoginInfo('', '');
  }

  ngOnInit() {
  }

  public onLogInSubmit(): void {
    console.log('submitted:' + this.loginInfo.username + ',' + this.loginInfo.password);
    this.authService.authenticate(this.loginInfo).subscribe(
      res => console.log(res)
    );
  }
}
