import { RouteEnum } from "../constants/route";

export interface IResquestEvent {
  params: any; // todo
  route: RouteEnum;
}

export interface IUserSignUpResquestParams {
  username: string;
  phone: string;
}

export interface IUserUpdateInfoResquestParams {
  _id: string;
  username?: string;
  phone?: string;
}