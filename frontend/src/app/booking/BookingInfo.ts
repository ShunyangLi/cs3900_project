export class BookingInfo {
  constructor(
    public name: string,
    // tslint:disable-next-line:variable-name
    public room_id: string,
    public email: string,
    // tslint:disable-next-line:variable-name
    public check_in: string,
    // tslint:disable-next-line:variable-name
    public check_out: string,
    public price: string,
    // tslint:disable-next-line:variable-name
    public comment: string
    // tslint:disable-next-line:variable-name
  ) {}
}
