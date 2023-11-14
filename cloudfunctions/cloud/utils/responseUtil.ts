import { AppCodeEnum } from "../constants/appCode";
import { IResponse } from "../interface/iResponse";

function basicHandler(code: AppCodeEnum, data: any = null, msg: string = "",): IResponse {
	switch (code) {
		case AppCodeEnum.SERVICE_ERROR:
			msg = "服务器繁忙，请稍后再试";
      break;
    case AppCodeEnum.REQUEST_API_NOT_FOUND:
      msg = "接口路由未定义";
      break;
	}

	return {
		code: code,
		msg: msg,
		data: data
	}

}

function successHandler(data: any): IResponse {
	return basicHandler(AppCodeEnum.SUCCESS, data);
}

function errorHandler(code: AppCodeEnum, msg: string = ""): IResponse {
	return basicHandler(code, msg);
}

function serviceErrorHandler(): IResponse {
	return basicHandler(AppCodeEnum.SERVICE_ERROR);
}

export const responseUtil = {
  successHandler,
  errorHandler,
  serviceErrorHandler,
}
