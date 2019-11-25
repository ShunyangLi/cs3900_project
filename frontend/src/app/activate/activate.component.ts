import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Token} from './token';
import {ActivateService} from '../services/activate.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css'],
  providers: [ActivateService]
})

export class ActivateComponent implements OnInit {

  private token: Token;

  /**
   *
   * This class is the controller for email sign up activation page.
   * @param activatedRoute the helper object to grab token string from URL
   * @param activateService HTTP connection service for activation controller
   */
  constructor(private activatedRoute: ActivatedRoute, private activateService: ActivateService) {
    this.token = new Token('');
  }

  /**
   * Initialisation of rendering activation page
   * 1. get the token string from URL
   * 2. send the token string to the backend server
   */
  ngOnInit() {
    this.token.token = this.activatedRoute.snapshot.paramMap.get('token');
    this.activateService.activate(this.token).subscribe(
      res => console.log(res)
    );
  }

  /**
   * Navigate to login page
   */
  public goLogin(): void {
    window.location.assign('/login');
  }
}

