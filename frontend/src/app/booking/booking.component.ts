import { Component, OnInit } from '@angular/core';
import {SearchService} from '../services/search.service';
import {HotelSearchResultInfo} from '../search-result/hotelSearchResultInfo';
import {Router, ParamMap, ActivatedRoute, Route} from '@angular/router';
import {BookingInfo} from './BookingInfo'
import {SignupService} from "../services/signup.service";
import {BookingService} from "../services/booking.service";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  public bookinInfo: BookingInfo;
  constructor(private bookingService: BookingService) {
    this.bookinInfo = new BookingInfo(  '', '', '', '',
      '', '', '', '');
  }

  ngOnInit() {
    this.bookinInfo.booking_id = history.state.id;
    this.bookinInfo.price = history.state.price;
    // this.bookinInfo.room_type = history.state.room_type;
    // console.log(this.bookinInfo.booking_id);
    // console.log(this.bookinInfo.price);
    // console.log(this.bookinInfo.room_type);
  }

  public sendBookingRequest(): void {
    console.log(this.bookinInfo.booking_id);
    console.log(this.bookinInfo.username);
    console.log(this.bookinInfo.passport);
    // console.log(this.bookinInfo.booking_data);
    // console.log(this.bookinInfo.check_in_data);
    // console.log(this.bookinInfo.days);
    // console.log(this.bookinInfo.price);
    // console.log(this.bookinInfo.room_type);
    console.log(this.bookinInfo.comment);
    this.bookingService.booking(this.bookinInfo).subscribe(
      res => console.log(res)
    );
  }

  public onBookSubmit(): void {
  }
}
