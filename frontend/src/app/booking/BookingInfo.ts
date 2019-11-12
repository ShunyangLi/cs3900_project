export class BookingInfo {
  constructor(
    public booking_id: string,
    public username: string,
    public passport: string,
    public booking_data: string,
    public check_in_data: string,
    public days: string,
    public price: string,
    // tslint:disable-next-line:variable-name
    public room_type: string,
    public comment: string
    // tslint:disable-next-line:variable-name
  ) {}
}
