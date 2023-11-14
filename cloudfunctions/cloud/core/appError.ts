import { AppCodeEnum, APP_ERROR_NAME } from "../constants/appCode";

class AppError extends Error {
  code: AppCodeEnum;
  constructor(message: string, code: AppCodeEnum) {
    super(message);  
    this.name = APP_ERROR_NAME;  
    this.code = code;
  }
}

export default AppError;