import { AppCodeEnum } from "../constants/appCode";

export interface IResponse {
  data: any;
  msg: string;
  code: AppCodeEnum;
}
