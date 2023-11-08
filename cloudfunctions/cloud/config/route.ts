import { RouteEnum } from "../constants";

const routeMapping: Record<RouteEnum, string>  = {
  [RouteEnum.SIGN_UP]: "userController@signUp",
}

export default routeMapping;