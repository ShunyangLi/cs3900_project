import {RoomInfo} from './roomInfo';

export class ListingInfo {
  constructor(
    public description: string,
    public email: string,
    public host: string,
    // tslint:disable-next-line:variable-name
    public hotel_address: string,
    // tslint:disable-next-line:variable-name
    public hotel_id: string,
    // tslint:disable-next-line:variable-name
    public hotel_name: string,
    public phone: string,
    public rating: string,
    public rooms: Array<RoomInfo>
  ) {
  }
}
