import { Component, OnInit } from '@angular/core';
import {SearchService} from '../services/search.service';
import {ActivatedRoute} from '@angular/router';
import {HotelSearchResultInfo} from '../search-result/hotelSearchResultInfo';
import {RoomInfo} from './roomInfo';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  providers: [SearchService]
})
export class RoomsComponent implements OnInit {

  public show: Array<RoomInfo> = [];
  tmp: RoomInfo;
  hotelName: string;
  filtered = false;
  // tslint:disable-next-line:max-line-length
  constructor(private activatedRoute: ActivatedRoute, private searchService: SearchService) { }

  ngOnInit() {
    const hotelId = this.activatedRoute.snapshot.paramMap.get('hotelId');
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

}
