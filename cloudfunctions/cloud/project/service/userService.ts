import { IUserSignUpResquestParams, IUserUpdateInfoResquestParams } from "../../interface/iRequest";
import { checkRequiredField } from "../../utils/common";
import UserModel from "../model/userModel";
import BaseService from "./baseService";

class UserService extends BaseService {
  async existUser(openId: string) {
    const user = await UserModel.count({
      USER_MINI_OPENID: openId
    });
    return user > 0;
  }

  async insertUser(openId: string, data: IUserSignUpResquestParams) {
    checkRequiredField(["username", "phone"], data);

    const existUser = await this.existUser(openId);
    if (existUser) return;

    return await UserModel.insert({
      USER_MINI_OPENID: openId,
      USER_NAME: data.username,
      USER_PHONE: data.phone,
    });
  }

  async updateUser(openId: string, data: IUserUpdateInfoResquestParams) {
    checkRequiredField(["_id", "username", "phone"], data);

    return await UserModel.edit({
      _id: data._id,
    },
    {
      USER_MINI_OPENID: openId,
      USER_NAME: data.username,
      USER_PHONE: data.phone,
    });
  }
}

export default UserService;