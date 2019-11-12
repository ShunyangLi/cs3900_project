import { Component, OnInit } from '@angular/core';
import {Router, ParamMap, ActivatedRoute, Route} from '@angular/router';
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
  constructor(private activatedRoute: ActivatedRoute, private activateService: ActivateService, private route: Router) {
    this.token = new Token('');
  }

  ngOnInit() {
    this.token.token = this.activatedRoute.snapshot.paramMap.get('token');
    this.activateService.activate(this.token).subscribe(
      res => console.log(res)
    );

    // setTimeout(() => {
    //   this.route.navigate(['/homepage']).then();
    // }, 2000); // 2s
  }
  public goLogin(): void {
    window.location.assign('/login');
  }
}

