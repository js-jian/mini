import { ResquestEvent } from "../../interface";
import { RouteEnum } from "../../constants";

class Controller {
  _route: RouteEnum;
  _openId: string;
  _event: ResquestEvent;
  _request: any; // todo

  constructor(route: RouteEnum, openId: string, event: ResquestEvent) {
    this._route = route; // 路由
    this._openId = openId; //用户身份
    this._event = event; // 所有参数   
    this._request = event.params; //数据参数
  }
}

export default Controller;