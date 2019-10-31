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

  private allHotelsInfo: Array<HotelSideBarInfo> = [];
  private defaultHotelsInfo: Array<HotelSideBarInfo> = [];
  private resStr: string;
  constructor(private mapService: MapService, private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.mapService.getAllHotels().subscribe(
      res => {
        let count = 0;
        this.resStr = JSON.stringify(res);
        JSON.parse(this.resStr).res.forEach((obj) => {
          const hotel = new HotelSideBarInfo('', -1, '', '');
          hotel.description = obj.description;
          hotel.id = obj.id;
          hotel.location = obj.location;
          hotel.name = obj.name;
          this.allHotelsInfo.push(hotel);
          if (count < 8) { // defaultHotelsInfo only takes the first 8 from the database.
            this.defaultHotelsInfo.push(hotel);
            ++ count;
          }
        });

        const defaultMarkingAddr: Array<string> = [];
        this.defaultHotelsInfo.forEach(info => {
          defaultMarkingAddr.push(info.location);
        });
        const allAddresses: Array<string> = [];
        this.allHotelsInfo.forEach(info => {
          allAddresses.push(info.location);
        });
        this.localStorageService.storeOnLocalStorage(defaultMarkingAddr, 'defaultMarkingAddr');
        this.localStorageService.storeOnLocalStorage(allAddresses, 'allAddresses');
      }
    );
  }

}
