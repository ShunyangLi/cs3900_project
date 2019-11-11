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
  // tslint:disable-next-line:variable-name ban-types
  public booking_id: string;
  public price: number;
  public roomtype: string;
  constructor(private router: Router) {
  }

  ngOnInit() {
    const count = 0;
    this.result = history.state.data;
    console.log(this.result);
  }
  public setBookingId(event, id, price, roomtype) {
    this.booking_id = id;
    this.price = price;
    this.roomtype = roomtype;
  }
  public onBookingClick(): void {
    this.router.navigateByUrl('Booking', {state: {id: this.booking_id, price: this.price, room_type: this.roomtype}});
    console.log(this.booking_id);
    console.log(this.price);
    console.log(this.roomtype);
  }
}
