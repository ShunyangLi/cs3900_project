import { Directive, HostListener} from '@angular/core';
import {MapSidebarComponent} from '../map-sidebar/map-sidebar.component';

@Directive({
  selector: '[appChangeMapSidebar]'
})
export class ChangeMapSidebarDirective {

  constructor(private mapSidebar: MapSidebarComponent) { }
  @HostListener('updateMapSidebar', ['$event']) onChange() {
    this.mapSidebar.title = 'Suggestions Based On Your Route';
    this.mapSidebar.displayHotelsInfo = [];
    // @ts-ignore
    const locationList = event.detail.message;
    const allHotelList = this.mapSidebar.allHotelsInfo;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < locationList.length; ++i) {
      const hotels = allHotelList.filter(h => {
        return h.location === locationList[i];
      }); // It should only return one hotel.
      this.mapSidebar.displayHotelsInfo.push(hotels[0]);
    }
  }
}
