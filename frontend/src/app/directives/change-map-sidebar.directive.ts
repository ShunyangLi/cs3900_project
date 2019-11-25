import { Directive, HostListener} from '@angular/core';
import {MapSidebarComponent} from '../map-sidebar/map-sidebar.component';

@Directive({
  selector: '[appChangeMapSidebar]'
})
export class ChangeMapSidebarDirective {
  /**
   * This class if for the mapside bar
   * @param mapSidebar component from other ts file
   */
  constructor(private mapSidebar: MapSidebarComponent) { }
  @HostListener('updateMapSidebar', ['$event']) onChange() {
    this.mapSidebar.init = false;
    this.mapSidebar.title = 'Suggestions Based On Your Route';
    this.mapSidebar.displayHotelsInfo = [];
    // @ts-ignore
    const locationList = event.detail.message;
    const allHotelList = this.mapSidebar.allHotelsInfo;

    // tslint:disable-next-line:forin
    for (const key in locationList) {
      const hotels = allHotelList.filter(h => {
        return h.location === key;
      }); // It should only return one hotel.
      this.mapSidebar.displayHotelsInfo.push(hotels[0]);
    }
    console.log('in ts directive');
    console.log(this.mapSidebar.displayHotelsInfo);
  }

}
