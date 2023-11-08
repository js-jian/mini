import { CollectionEnum } from "../../constants";
import { ResquestWhere } from "../../interface";
import { getCloud } from "../cloud/baseCloud";

const cloud = getCloud();
const db = cloud.database();

async function count(collectionName: CollectionEnum, where: ResquestWhere) {
	let query = await db.collection(collectionName);

	query = await query.where(where).count();

	return query.total;
}

async function getOne(
  collectionName: CollectionEnum,
  where: ResquestWhere,
  fields: string = '*',
  orderBy = {}
) {
	// 查询条件 
	let query = await db.collection(collectionName)
    .where(where)
		.limit(1);

	// 取出特定字段 
	if (fields != '*')
		query = await query.field(fields);

	// // 排序
	// if (orderBy)
	// 	query = await fmtOrderBy(query, orderBy);

	// 取数据
	query = await query.get();

  return query?.data?.[0];
}

async function isExistCollection(collectionName: CollectionEnum) {
	try {
		await getOne(collectionName, {});
		return true;

	} catch (err) {
		return false;
	}
}

async function createCollection(collectionName: CollectionEnum) {
	try {
		await db.createCollection(collectionName);

		console.log('>> Create New Collection [' + collectionName + '] Success, DONE.');
		return true;
	} catch (err) {
		console.error('>> Create New Collection [' + collectionName + '] Failed, Code=' + err.errCode + '|' + err.errMsg);
		return false;
	}
}

export default {
  count,
  isExistCollection,
  createCollection,
};
