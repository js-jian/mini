import { CollectionEnum } from "../../constants";
import dbUtil from "../../framework/database/dbUtil";
import SetupModel from "../model/setupModel";

class BaseService {
  constructor() {
  }

  async initSetup() {
    if (await dbUtil.isExistCollection(CollectionEnum.JIE_SETUP)) {
			let setupCnt = await SetupModel.count({});
			if (setupCnt > 0) return;
		}

    console.log('# initSetup...');

    Object.values(CollectionEnum).forEach(async (collectionName) => {
      if (
          collectionName !== CollectionEnum.JIE_NO_COLLECTION &&
          !await dbUtil.isExistCollection(collectionName)
      ) {
        await dbUtil.createCollection(collectionName);
      }
    });
  }
}

export default BaseService;