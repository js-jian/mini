export enum RouteEnum {
  USER_SIGN_UP = "USER_SIGN_UP",
  USER_UPDATE_INFO = "USER_UPDATE_INFO"
}

export const routeMapping: Record<RouteEnum, string>  = {
  [RouteEnum.USER_SIGN_UP]: "userController@signUp",
  [RouteEnum.USER_UPDATE_INFO]: "userController@updateInfo",
}
