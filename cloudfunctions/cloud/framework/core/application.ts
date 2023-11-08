import { ResquestEvent } from "../../interface";
import routeMapping from "../../config/route";
import { getCloud } from "../cloud/baseCloud";

async function start(event: ResquestEvent) {
  const cloud = getCloud();
  const wxContext = cloud.getWXContext();
  const openId = wxContext.OPENID;

  console.log("application--start", {
    routeMapping, event,1:routeMapping[event.route]
  })

  const routeArr = routeMapping[event.route].split('@');
  const controllerName = routeArr[0].toLowerCase().trim();
  const actionName = routeArr[1];

  const controllerModule = await import(`project/controller/${controllerName}`);
  const controller = new controllerModule.default(event.route, openId, event);

  // 调用方法    
  await controller['initSetup']();
  let result = await controller[actionName]();
}

export default {
  start
}