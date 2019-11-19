import { Component, OnInit } from '@angular/core';
import {BookingExa} from './bookingExa';
import {HotelSideBarInfo} from '../map-sidebar/hotelSideBarInfo';
import {MapService} from '../services/map.service';
import {LocalStorageService} from '../services/local-storage.service';
import {RecommendationService} from '../services/recommendation.service';

@Component({
  selector: 'app-booking-com-recommendation',
  templateUrl: './booking-com-recommendation.component.html',
  styleUrls: ['./booking-com-recommendation.component.css'],
  providers: [MapService, LocalStorageService]
})
export class BookingComRecommendationComponent implements OnInit {
  public allHotelsInfo: Array<BookingExa> = [];
  private resStr: string;


  public today = new Date().toLocaleDateString();
  constructor(private recService: RecommendationService) {

  }

  ngOnInit() {
    this.recService.RecInfo().subscribe(
      res => {
        console.log(res);
        this.resStr = JSON.stringify(res);
        JSON.parse(this.resStr).res.forEach((obj) => {

          obj.result.forEach((hotel) => {
            const bookingres = new BookingExa('', '', 100);
            bookingres.name = hotel.hotel_name_trans;
            bookingres.address = hotel.address;
            bookingres.price = hotel.min_total_price;
            this.allHotelsInfo.push(bookingres);
           });
          }
        );
      }
    );
  }

}



