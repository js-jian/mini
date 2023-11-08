import { CollectionEnum } from "../../constants";
import { ResquestWhere } from "../../interface";
import dbUtil from "./dbUtil";

class Model {
  static CL: CollectionEnum;
  static FIELD_PREFIX: string;
  static DB_STRUCTURE: string | Record<string, any>;

	static async count(where: ResquestWhere) {
		return await dbUtil.count(this.CL, where);
	}
}

// 集合名
Model.CL = CollectionEnum.JIE_NO_COLLECTION;

// 集合结构
Model.DB_STRUCTURE = 'no-dbStructure';

// 字段前缀
Model.FIELD_PREFIX = 'NO_';

export default Model;