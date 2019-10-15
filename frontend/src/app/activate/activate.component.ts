import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {Observable} from 'rxjs';
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
  constructor(private route: ActivatedRoute, private activateService: ActivateService) {
    this.token = new Token('');
  }

  ngOnInit() {
    this.token.token = this.route.snapshot.paramMap.get('token');
    this.activateService.activate(this.token).subscribe(
      res => console.log(res)
    );
  }
}

