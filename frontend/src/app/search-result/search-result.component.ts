import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router, ParamMap, ActivatedRoute, Route} from '@angular/router';
import {HomepageComponent} from '../homepage/homepage.component';
import {SearchRes} from './searchRes';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
  providers: [DataService]
})
export class SearchResultComponent implements OnInit {
  public result: Array<SearchRes>;
  constructor() {
  }

  ngOnInit() {
    const count = 0;
    this.result = history.state.data;
    // this.result.forEach((itme, index)=>{
    //   if (itme.img_url.length === 0) { this.result.splice(index, 1); }
    // })
    console.log(this.result);
    //console.log(this.result[0].img_url[0]['url']);
    // this.data.getData().subscribe(result => {
    //   // console.log(message);
    //   this.result = result;
    // });
    // console.log(this.result);
  }

}
