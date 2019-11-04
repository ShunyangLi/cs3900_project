import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router, ParamMap, ActivatedRoute, Route} from '@angular/router';
import {HomepageComponent} from '../homepage/homepage.component';
import {SearchRes} from "./searchRes";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  public message: Array<SearchRes>;
  constructor(private data: DataService) {
  }




  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    console.log(this.message);
  }

}
