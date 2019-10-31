import { Component, OnInit } from '@angular/core';
import {MapService} from '../services/map.service';
import {HotelSideBarInfo} from './hotelSideBarInfo';
import {LocalStorageService} from '../services/local-storage.service';

@Component({
  selector: 'app-map-sidebar',
  templateUrl: './map-sidebar.component.html',
  styleUrls: ['./map-sidebar.component.css'],
  providers: [MapService, LocalStorageService]
})
export class MapSidebarComponent implements OnInit {

  private defaultHotelsInfo: Array<HotelSideBarInfo> = [];
  private resStr: string;
  constructor(private mapService: MapService, private localStorageService: LocalStorageService) {
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
        // two fake hotels for testing:
        this.defaultHotelsInfo.push(new HotelSideBarInfo('xx', 100, '1 Cawood Ave, Little Bay NSW 2036', 'Little Bay Cove'));
        this.defaultHotelsInfo.push(new HotelSideBarInfo('yy', 101, '287 Gardeners Rd, Eastlakes NSW 2018', 'Crown Group'));

        const markingAddr: Array<string> = [];
        this.defaultHotelsInfo.forEach(info => {
          markingAddr.push(info.location);
        });
        this.localStorageService.storeOnLocalStorage(markingAddr);
      }
    );
  }

}
