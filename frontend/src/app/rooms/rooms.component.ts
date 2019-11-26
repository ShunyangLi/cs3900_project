import { Component, OnInit } from '@angular/core';
import {SearchService} from '../services/search.service';
import {ActivatedRoute} from '@angular/router';
import {HotelSearchResultInfo} from '../search-result/hotelSearchResultInfo';
import {RoomInfo} from './roomInfo';
import {CheckAvaData} from './checkAvaData';
import {BookingService} from '../services/booking.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  providers: [SearchService, BookingService]
})
export class RoomsComponent implements OnInit {

  public show: Array<RoomInfo> = [];
  tmp: RoomInfo;
  hotelName: string;
  filtered = false;
  // tslint:disable-next-line:max-line-length
  check: CheckAvaData = new CheckAvaData('', '', '', '', '');
  hotelId: string;

  /**
   * This class is the controller for room list and booking room
   * @param activatedRoute get the hotel id
   * @param searchService Http connection service for searching room
   * @param book Http connection service for booking room
   */
  constructor(private activatedRoute: ActivatedRoute, private searchService: SearchService, private book: BookingService) { }

  /**
   *  Initialisation of the page: get the all hotel result and room result from backend
   */
  ngOnInit() {
    const hotelId = this.activatedRoute.snapshot.paramMap.get('hotelId');
    this.hotelId = hotelId;
    JSON.parse(window.localStorage.getItem('hotelSearchResults')).addrList.forEach((obj => {
      const tmp = JSON.parse(obj);
      // tslint:disable-next-line:triple-equals
      if (tmp.hotel_id == hotelId) {
        this.hotelName = tmp.hotel_name;
      }
    }));
    this.searchService.searchRoom(hotelId).subscribe(
      res => {
        // @ts-ignore
        res.res.rooms.forEach((obj) => {
          this.tmp = obj;
          console.log(this.tmp);
          this.show.push(this.tmp);
        });
      }
    );
  }

  /**
   *  The handler for Check the available room
   */
  public onSubmitCheck(): void {
    this.filtered = true;
    this.check.hotel_id = this.hotelId;
    this.book.checkAva(this.check).subscribe((res) => {
      // @ts-ignore
      this.show = res.res;
      console.log('show');
      console.log(this.show);
      window.localStorage.setItem('checkAva', JSON.stringify(this.check));

    });
  }
}
