import { CollectionEnum } from "../../constants/collection";
import { DbStructureFieldTypeEnum } from "../../constants/common";
import BaseModel from "./baseModel";

class UserModel extends BaseModel {

}

// 集合名
UserModel.CL = CollectionEnum.J_USER;

// 字段前缀
UserModel.FIELD_PREFIX = "USER_";

UserModel.DB_STRUCTURE = {
  USER_MINI_OPENID: {
    type: DbStructureFieldTypeEnum.STRING,
    required: true,
  },
	USER_NAME: {
    type: DbStructureFieldTypeEnum.STRING,
    required: true,
  },
	USER_PHONE: {
    type: DbStructureFieldTypeEnum.INT,
    required: true,
  }, 

	USER_ADD_TIME: {
    type: DbStructureFieldTypeEnum.INT,
    required: false,
  },
	USER_EDIT_TIME: {
    type: DbStructureFieldTypeEnum.INT,
    required: false,
  },
};

export default UserModel;
