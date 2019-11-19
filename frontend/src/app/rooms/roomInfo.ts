export class RoomInfo {
  constructor(
    public adults: string,
    public bathroom: string,
    public bedroom: string,
    public children: string,
    // tslint:disable-next-line:variable-name
    public hotel_id: string,
    // tslint:disable-next-line:variable-name
    public img_url: Array<string>,
    public name: string,
    public price: string,
    // tslint:disable-next-line:variable-name
    public room_id: string
  ) {}
}
