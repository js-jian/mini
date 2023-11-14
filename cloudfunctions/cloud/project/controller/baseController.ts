import { AppCodeEnum } from "../../constants/appCode";
import AppError from "../../core/appError";
import { IResquestEvent } from "../../interface/iRequest";
import BaseService from "../service/baseService";

class BaseController {
  _requestEvent: IResquestEvent;
  _requestParams: IResquestEvent["params"];
  _openId: string;

  constructor(openId: string, event: IResquestEvent, params: IResquestEvent["params"]) {
    this._openId = openId; // 用户身份
    this._requestEvent = event; // 请求完整数据   
    this._requestParams = params; // 接口参数

    if (!openId) {
			throw new AppError('OPENID is unfined', AppCodeEnum.SERVICE_ERROR);
		}
  }

  async initSetup() {
		let service = new BaseService();
		await service.initSetup();
	}
}

export default BaseController;