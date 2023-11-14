
import { AppCodeEnum } from "../constants/appCode";
import AppError from "../core/appError";

/**
 * 判断数据是否等于undefined或null
 * @param {*} data 
 */
export function isNil(data: any) {
  return data === undefined || data === null;
}

export function checkRequiredField(fields: string[], data: any) {
  const missingField = fields?.find((field) => isNil(data?.[field]));
  if (missingField) {
    throw new AppError(`字段${missingField}必填`, AppCodeEnum.REQUEST_DATA_REQUIRE_ERROR)
  }
}
