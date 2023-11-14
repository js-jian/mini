import application from "./core/application";
import { IResquestEvent } from "./interface/iRequest";

// 云函数入口函数
exports.main = async (event: IResquestEvent) => {
	return await application.start(event);
}