export class SignUpInfo {
  constructor(
    public username: string,
    public password: string,
    // tslint:disable-next-line:variable-name
    public first_name: string,
    // tslint:disable-next-line:variable-name
    public last_name: string,
    public birthday: string,
    public type: string
  ) {}
}
