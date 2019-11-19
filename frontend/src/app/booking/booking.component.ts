import { Component, OnInit } from '@angular/core';
import {SearchService} from '../services/search.service';
import {HotelSearchResultInfo} from '../search-result/hotelSearchResultInfo';
import {Router, ParamMap, ActivatedRoute, Route} from '@angular/router';
import {BookingInfo} from './BookingInfo';
import {BookingService} from '../services/booking.service';
import {CheckAvaData} from '../rooms/checkAvaData';
import {stringify} from 'querystring';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  public bookingInfo: BookingInfo;
  roomId: string;
  check: CheckAvaData;
  price: string;
  totalCost: string;
  submitted = false;
  constructor(private bookingService: BookingService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.roomId = this.activatedRoute.snapshot.paramMap.get('roomId');
    this.price = this.activatedRoute.snapshot.paramMap.get('price');
    this.check = JSON.parse(window.localStorage.getItem('checkAva'));
    this.bookingInfo = new BookingInfo(  '', this.roomId, '', this.check.check_in,
      this.check.check_out, '', '');

    const d1 = new Date(this.check.check_in + 'T00:00:00');
    const d2 = new Date(this.check.check_out + 'T00:00:00');
    const diff = Math.abs(d1.getTime() - d2.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    // tslint:disable-next-line:radix
    this.totalCost = String(diffDays * parseInt(this.price));
    this.bookingInfo.price = this.totalCost;
  }

  public onBookSubmit(): void {
    console.log(this.bookingInfo);
    this.bookingService.book(this.bookingInfo).subscribe((res) => {
      console.log(res);
      window.location.assign('/homepage');
    });
  }
}
