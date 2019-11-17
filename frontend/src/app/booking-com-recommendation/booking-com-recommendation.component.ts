import { Component, OnInit } from '@angular/core';
import {BookingExa} from './bookingExa';
import {HotelSideBarInfo} from '../map-sidebar/hotelSideBarInfo';
import {MapService} from "../services/map.service";
import {LocalStorageService} from "../services/local-storage.service";

@Component({
  selector: 'app-booking-com-recommendation',
  templateUrl: './booking-com-recommendation.component.html',
  styleUrls: ['./booking-com-recommendation.component.css'],
  providers: [MapService, LocalStorageService]
})
export class BookingComRecommendationComponent implements OnInit {
  public allHotelsInfo: Array<BookingExa> = [];
  public ex1 = new BookingExa('merton', '17 Gardeners Road,Mascot', 100, '', '');
  public ex2 = new BookingExa('M', '10 Geoage Street,Sydney', 200, '', '');
  public ex3 = new BookingExa('PPP', '213 XXXXXX Street, Burwood', 300, '', '');

  public today = new Date().toLocaleDateString();
  constructor() {

  }

  ngOnInit() {
    this.allHotelsInfo.push(this.ex1, this.ex2, this.ex3);

  }
  public onToggle(hotel): void {
    // console.log(hotel);
    if (hotel.bgColor === '#95d8e2') {
      hotel.bgColor = '#ffc107';
      // hotel.fontColor = '#fff';
    } else {
      hotel.bgColor = '#95d8e2';
      // hotel.fontColor = '#000';
    }
    event = new CustomEvent(
      'updateIcon', {
        detail: {
          message: hotel.location,
          time: new Date()
        },
        bubbles: true,
        cancelable: true
      });
  }

}



