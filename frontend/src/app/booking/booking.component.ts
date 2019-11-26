import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BookingInfo} from './BookingInfo';
import {BookingService} from '../services/booking.service';
import {CheckAvaData} from '../rooms/checkAvaData';

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

  /**
   * This class is the controller for booking form web page
   * @param bookingService HTTP connection service for booking page controller
   * @param activatedRoute the helper object to grab room_id and room price strings from the URL
   */
  constructor(private bookingService: BookingService, private activatedRoute: ActivatedRoute) {
  }

  /**
   * Initialisation of rendering activation page: prefill some values in the booking form
   */
  ngOnInit() {
    this.roomId = this.activatedRoute.snapshot.paramMap.get('roomId');
    this.price = this.activatedRoute.snapshot.paramMap.get('price');
    this.check = JSON.parse(window.localStorage.getItem('checkAva'));
    this.bookingInfo = new BookingInfo('', this.roomId, '', this.check.check_in, this.check.check_out, '', '');
    // convert the string into date type and then computer the days
    const d1 = new Date(this.check.check_in + 'T00:00:00');
    const d2 = new Date(this.check.check_out + 'T00:00:00');
    const diff = Math.abs(d1.getTime() - d2.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    // tslint:disable-next-line:radix
    this.totalCost = String(diffDays * parseInt(this.price));
    this.bookingInfo.price = this.totalCost;
  }

  /**
   * The handler for submitting the booking form
   * It will send the data to the backend server.
   */
  public onBookSubmit(): void {
    this.submitted = true;
    // console.log(this.bookingInfo);
    // make a booking post
    this.bookingService.book(this.bookingInfo).subscribe((res) => {
      console.log(res);
    });
  }
}
