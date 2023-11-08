import application from "./framework/core/application";
import { ResquestEvent } from "./interface";

// 云函数入口函数
exports.main = async (event: ResquestEvent) => {
	return await application.start(event);
}