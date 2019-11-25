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

  /**
   * This class is for the BookingRecommendation which using booking api
   *
   *
   * @param recService Http connection service for api
   */
  constructor(private recService: RecommendationService) {

  }
  public curUrl: string;

  /**
   *  get Json file from api and extract address postcode name and price from it
   */
  ngOnInit() {
    this.recService.RecInfo().subscribe(
      res => {
        this.resStr = JSON.stringify(res);
        // console.log(JSON.parse(this.resStr);
        const obj = JSON.parse(this.resStr);
        obj.result.forEach((bookres) => {
          const bookingres = new BookingExa('', '', '', '');
          bookingres.name = bookres.hotel_name_trans;
          if (bookres.district === '') {
            bookingres.address = '<b>Address:</b> ' + bookres.address + ', <b>Postcode:</b> ' + bookres.zip;
          } else {
            bookingres.address = '<b>Address:</b> ' + bookres.address +
              ' <b>District:</b> ' + bookres.district + ', <b>Postcode:</b> ' + bookres.zip;
          }
          if (bookres.min_total_price === '') {
            console.log(bookres.min_total_price)
            bookres.min_total_price = '120';
          }
          bookingres.price = '<b>Price: </b> $' + bookres.min_total_price;
          bookingres.url = bookres.url;
          this.allHotelsInfo.push(bookingres);
        });

        // JSON.parse(this.resStr).res.forEach((obj) => {
        //
        //   // obj.result.forEach((hotel) => {
        //   //   const bookingres = new BookingExa('', '', 100);
        //   //   bookingres.name = hotel.hotel_name_trans;
        //   //   bookingres.address = hotel.address;
        //   //   bookingres.price = hotel.min_total_price;
        //   //   this.allHotelsInfo.push(bookingres);
        //   //  });
        //   }
        // );
        // }
        // );
      });

  }

  /**
   * Click the recommendation will open the booking page
   * @param url of booking page
   */
  public onClick(url: string): void {
    window.open(url, '_blank');
  }
}


