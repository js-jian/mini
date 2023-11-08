import { ErrorCodeEnum } from "../../constants";

class AppError extends Error {
  code: ErrorCodeEnum;
  constructor(message: string, code: ErrorCodeEnum) {
    super(message);  
    this.name = 'AppError';  
    this.code = code;
  }
}

export default AppError;