import UserService from "../service/userService";
import BaseController from "./baseController";

class UserController extends BaseController {
  async signUp() {
    const service = new UserService();
    return await service.insertUser(this._openId, this._requestParams);
  }

  async updateInfo() {
    const service = new UserService();
    return await service.updateUser(this._openId, this._requestParams);
  }
}

export default UserController;
