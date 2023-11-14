export const APP_ERROR_NAME = "J_AppError";

export enum AppCodeEnum {
  SUCCESS = 200,
  SERVICE_ERROR = 500,
  MODEL_DEFINITION_ERROR = 1000, // 模型定义错误
  MODEL_DATA_REQUIRE_ERROR = 1001, // 模型数据错误

  REQUEST_DATA_REQUIRE_ERROR = 400, // 请求数据错误
  REQUEST_API_NOT_FOUND = 404, // 接口路由未定义
}
