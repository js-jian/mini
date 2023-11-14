import { CollectionEnum } from "../constants/collection";
import { getCloud } from "../core/baseCloud";

const cloud = getCloud();
const db = cloud.database();

async function count(collectionName: CollectionEnum, where: any) {
	let query = await db.collection(collectionName);

	query = await query.where(where).count();

	return query.total;
}

async function getOne(
  collectionName: CollectionEnum,
  where: any,
  fields: string = '*',
) {
	// 查询条件 
	let query = await db.collection(collectionName)
    .where(where)
		.limit(1);

	// 取出特定字段 
	if (fields != '*')
    query = await query.field(fields);
    
	// 取数据
	query = await query.get();

  return query?.data?.[0];
}

async  function insert(collectionName: CollectionEnum, data: any) {
  const query = await db.collection(collectionName).add({ data });

  return query._id;
}

async function isExistCollection(collectionName: CollectionEnum) {
	try {
		await getOne(collectionName, {});
		return true;

	} catch (error: any) {
		return false;
	}
}

async function createCollection(collectionName: CollectionEnum) {
	try {
		await db.createCollection(collectionName);

		console.log('>> Create New Collection [' + collectionName + '] Success, DONE.');
		return true;
	} catch (error: any) {
		console.error('>> Create New Collection [' + collectionName + '] Failed, Code=' + error.errCode + '|' + error.errMsg);
		return false;
	}
}

async function edit(collectionName: CollectionEnum, where: any, data: any) {
  const query = await db.collection(collectionName).where(where).update({
		data
	});

	return query.stats.updated;
}

export const dbUtil = {
  insert,
  count,
  edit,
  isExistCollection,
  createCollection,
};
