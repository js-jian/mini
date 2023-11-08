import Controller from "../../framework/client/controller";
import AppError from "../../framework/core/appError";
import { ResquestEvent } from "../../interface";
import { ErrorCodeEnum, RouteEnum } from "../../constants";
import BaseService from "../service/baseService";

class BaseController extends Controller {
  constructor(route: RouteEnum, openId: string, event: ResquestEvent) {
    super(route, openId, event);

    if (!openId) {
			console.error('OPENID is unfined');
			throw new AppError('OPENID is unfined', ErrorCodeEnum.SERVICE_ERR);
		}
  }

  async initSetup() {
		let service = new BaseService();
		await service.initSetup();
	}
}

export default BaseController;