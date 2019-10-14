export class SignUpInfo {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public secondPassword: string,
    public registerType: string
  ) {}
}
