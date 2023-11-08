import BaseController from "./baseController";

class UserController extends BaseController {
  const signUp = (...args) => {
    console.log('-signup--', args)
  }
}

export default UserController;
