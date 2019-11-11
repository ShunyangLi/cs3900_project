export class SearchRes {
  constructor(
    public id: string,
    public bathroom: string,
    public bedrooms: string,
    public description: string,
    public email: string,
    // tslint:disable-next-line:variable-name
    public img_url: string[],
    public location: string,
    public name: string,
    public phone: string,
    public price: number,
    public room_type: string,
    public web: string

  ) {}


}
