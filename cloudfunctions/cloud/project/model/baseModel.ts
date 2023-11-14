import AppError from "../../core/appError";
import { DbStructure } from "../../interface/iDb";
import { AppCodeEnum } from "../../constants/appCode";
import { CollectionEnum } from "../../constants/collection";
import { DbStructureFieldTypeEnum } from "../../constants/common";
import { isNil } from "../../utils/common";
import { dbUtil } from "../../utils/dbUtil";
import { getFormatUTCTimestamp } from "../../utils/timeUtil";

class BaseModel {
  static CL: CollectionEnum;
  static FIELD_PREFIX: string;
  static DB_STRUCTURE: DbStructure;
  static UPDATE_TIME: boolean;

  /**
   * 获取不同类型的字段默认值
   * @param type 字段类型
   */
  // static getDefaultValueByFieldType(type: DbStructureFieldTypeEnum) {
  //   switch (type) {
  //     case DbStructureFieldTypeEnum.BOOLEAN:
  //       return false;
  //     case DbStructureFieldTypeEnum.FLOAT:
  //       return 0;
  //     case DbStructureFieldTypeEnum.INT:
  //       return 0;
  //     case DbStructureFieldTypeEnum.STRING:
  //       return "";
  //   }
  // }

  /**
   * 检查数据类型是否正确
   * @param type 字段类型
   * @param fieldKey 字段名
   * @param fieldValue 字段值
   */
  static checkModelDataType(type: DbStructureFieldTypeEnum, fieldKey: string, fieldValue: any) {
    const typeMapping = new Map([
      [DbStructureFieldTypeEnum.BOOLEAN, "[object Boolean]"],
      [DbStructureFieldTypeEnum.INT, "[object Number]"],
      [DbStructureFieldTypeEnum.FLOAT, "[object Number]"],
      [DbStructureFieldTypeEnum.STRING, "[object String]"]
    ]);

    if (Object.prototype.toString.call(fieldValue) !== typeMapping.get(type)) {
      const message = `【模型数据错误】模型字段${fieldKey}数据类型错误，期望类型：${type} 实际类型：${typeof fieldValue}`;
      throw new AppError(message, AppCodeEnum.MODEL_DATA_REQUIRE_ERROR);
    }
  }

  /**
   * 根据模型定义的数据结构(DB_STRUCTURE)整理数据
   * @param data 模型数据
   */
  static clearModelData(data: Record<string, any>) {
    const structure = this.DB_STRUCTURE;

    const modelData: Record<string, any> = {};

    for (let key in structure) {
      if (isNil(structure[key])) {
				throw new AppError(`【模型定义错误】模型字段${key}未定义类型`, AppCodeEnum.MODEL_DEFINITION_ERROR);
      }

      if (data.hasOwnProperty(key)) {
        this.checkModelDataType(structure[key].type, key, data[key]);
        modelData[key] = data[key];
      } else if (structure[key].required) {
        throw new AppError(`【模型数据错误】模型字段${key}必填`, AppCodeEnum.MODEL_DATA_REQUIRE_ERROR);
      }
    }

    return modelData;
  }

	static async count(where: any) {
		return await dbUtil.count(this.CL, where);
  }
  
  static async insert(data: any) {
    if (this.UPDATE_TIME) {
      const currentTime = Number(getFormatUTCTimestamp());
      const addTimeField = `${this.FIELD_PREFIX}ADD_TIME`;
      if (isNil(data[addTimeField])) {
        data[addTimeField] = currentTime;
      }

      const editTimeField = `${this.FIELD_PREFIX}EDIT_TIME`;
      if (isNil(data[editTimeField])) {
        data[editTimeField] = currentTime;
      }
    }

    const modelData = this.clearModelData(data);

    return await dbUtil.insert(this.CL, modelData);
  }

	static async edit(where: any, data: any) {
		if (this.UPDATE_TIME) {
      const currentTime = Number(getFormatUTCTimestamp());
      const editTimeField = `${this.FIELD_PREFIX}EDIT_TIME`;
      if (isNil(data[editTimeField])) {
        data[editTimeField] = currentTime;
      }
		}

		const modelData = this.clearModelData(data);

		return await dbUtil.edit(this.CL, where, modelData);
	}
}

// 集合名
BaseModel.CL = CollectionEnum.J_NO_COLLECTION;

// 集合结构
BaseModel.DB_STRUCTURE = null;

// 字段前缀
BaseModel.FIELD_PREFIX = 'NO_';

// 为true时，会添加或更新ADD_TIME,EDIT_TIME
BaseModel.UPDATE_TIME = true;

export default BaseModel;
