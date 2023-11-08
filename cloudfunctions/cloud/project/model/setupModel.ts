import { CollectionEnum } from "../../constants";
import BaseModel from "./baseModel";

class SetupModel extends BaseModel {

}

// 集合名
SetupModel.CL = CollectionEnum.JIE_SETUP;

// 字段前缀
SetupModel.FIELD_PREFIX = "SETUP_";

SetupModel.DB_STRUCTURE = {
	_pid: 'string|true',
	SETUP_ID: 'string|true',

	SETUP_NAME: 'string|false', 

	SETUP_ABOUT: 'string|false|comment=关于我们',
	SETUP_ABOUT_PIC: 'array|false|default=[]|comment=关于我们的图片cloudId',

	SETUP_SERVICE_PIC: 'array|false|default=[]|comment=客服图片cloudId',
	SETUP_OFFICE_PIC: 'array|false|default=[]|comment=官微图片cloudId',

	SETUP_ADDRESS: 'string|false|comment=地址',
	SETUP_PHONE: 'string|false|comment=电话', 

	SETUP_ADD_TIME: 'int|true',
	SETUP_EDIT_TIME: 'int|true',
	SETUP_ADD_IP: 'string|false',
	SETUP_EDIT_IP: 'string|false',
};

export default SetupModel;
