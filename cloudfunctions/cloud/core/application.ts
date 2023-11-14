
import { IResquestEvent } from "../interface/iRequest";
import { getCloud } from "./baseCloud";
import { AppCodeEnum, APP_ERROR_NAME } from "../constants/appCode";
import { routeMapping } from "../constants/route";
import { isNil } from "../utils/common";
import { responseUtil } from "../utils/responseUtil";

async function start(event: IResquestEvent) {
  const cloud = getCloud();

  try {
    if (isNil(event.route)) {
      return responseUtil.errorHandler(AppCodeEnum.REQUEST_DATA_REQUIRE_ERROR, "route字段不可为空");
    }
    if (isNil(routeMapping[event.route])) {
      return responseUtil.errorHandler(AppCodeEnum.REQUEST_API_NOT_FOUND);
    }

    const wxContext = cloud.getWXContext();
    const openId = wxContext.OPENID;

    const routeArr = routeMapping[event.route].split('@');
    const controllerName = routeArr[0].trim();
    const actionName = routeArr[1];

    const controllerModule = await import(`project/controller/${controllerName}`);
    const controller = new controllerModule.default(openId, event, event.params);

    // 调用方法    
    await controller['initSetup']();
    const result = await controller[actionName]();

    return responseUtil.successHandler(result);
  } catch (error: any) {
    const log = cloud.logger();

    if (error.name === APP_ERROR_NAME) {
			log.warn({
				route: event.route,
				errCode: error.code,
				errMsg: error.message
			});

			return responseUtil.errorHandler(error.code, error.message);
		} else {
			log.error({
				route: event.route,
				errCode: error.code,
				errMsg: error.message,
				errStack: error.stack
      });
      
			return responseUtil.serviceErrorHandler();
		}
  }
}

export default {
  start
}