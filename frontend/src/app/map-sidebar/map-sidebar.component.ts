import { Component, OnInit } from '@angular/core';
import {MapService} from '../services/map.service';
import {HotelSideBarInfo} from './hotelSideBarInfo';

@Component({
  selector: 'app-map-sidebar',
  templateUrl: './map-sidebar.component.html',
  styleUrls: ['./map-sidebar.component.css'],
  providers: [MapService]
})
export class MapSidebarComponent implements OnInit {

  private defaultHotelsInfo: Array<HotelSideBarInfo> = [];
  private resStr: string;
  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.mapService.getAllHotels().subscribe(
      res => {
        this.resStr = JSON.stringify(res);
        JSON.parse(this.resStr).res.forEach((obj) => {
          const hotel = new HotelSideBarInfo('', -1, '', '');
          hotel.description = obj.description;
          hotel.id = obj.id;
          hotel.location = obj.location;
          hotel.name = obj.name;
          this.defaultHotelsInfo.push(hotel);
        });
        // console.log(this.defaultHotelsInfo);
      }
    );
  }

}
