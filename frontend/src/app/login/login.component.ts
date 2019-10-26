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
  constructor(private authService: AuthenticationService, private route: Router) {
    this.loginInfo = new LoginInfo('', '');
  }

  ngOnInit() {
  }

  public onLogInSubmit(): void {
    this.authService.authenticate(this.loginInfo).subscribe(
      res => window.localStorage.setItem('token', res['token'])
    );
    setTimeout(() => {
      this.route.navigate(['/profile']).then();
    }, 2000);
  }
}
