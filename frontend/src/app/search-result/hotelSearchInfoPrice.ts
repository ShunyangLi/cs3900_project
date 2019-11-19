export class HotelSearchResultInfoPrice {
  constructor(
    // tslint:disable-next-line:variable-name
    public hotel_id: string,
    public description: string,
    public email: string,
    // tslint:disable-next-line:variable-name
    public img_url: string[],
    // tslint:disable-next-line:variable-name
    public hotel_address: string,
    // tslint:disable-next-line:variable-name
    public hotel_name: string,
    public phone: string,
    public host: string,
    public rating: string,
    // tslint:disable-next-line:variable-name
    public min_price: string
  ) {}


}
