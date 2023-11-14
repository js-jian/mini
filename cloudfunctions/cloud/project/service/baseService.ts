import { CollectionEnum } from "../../constants/collection";
import { dbUtil } from "../../utils/dbUtil";
import UserModel from "../model/userModel";

class BaseService {
  constructor() {
  }

  async initSetup() {
    if (await dbUtil.isExistCollection(CollectionEnum.J_USER)) {
			let userCnt = await UserModel.count({});
			if (userCnt > 0) return;
		}

    console.log('# initSetup...');

    Object.values(CollectionEnum).forEach(async (collectionName) => {
      if (
          collectionName !== CollectionEnum.J_NO_COLLECTION &&
          !await dbUtil.isExistCollection(collectionName)
      ) {
        await dbUtil.createCollection(collectionName);
      }
    });
  }
}

export default BaseService;