export interface ILecturerRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companies: string;
}

export interface ILecturerLogin {
  email: string;
  password: string;
}

export interface IToken extends ILecturerLogin {
  token: string;
}
