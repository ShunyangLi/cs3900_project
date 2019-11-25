/**
 * This is the JSON data object for transmitting booking information via HTTP connection between
 * backend and frontend
 */
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
