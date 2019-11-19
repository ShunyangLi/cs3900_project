export class BookingInfo {
  constructor(
    public name: string,
    // tslint:disable-next-line:variable-name
    public booking_id: string,
    public username: string,
    public passport: string,
    // tslint:disable-next-line:variable-name
    public check_in_date: string,
    // tslint:disable-next-line:variable-name
    public check_out_date: string,
    public price: string,
    // tslint:disable-next-line:variable-name
    public comment: string
    // tslint:disable-next-line:variable-name
  ) {}
}
