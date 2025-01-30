import getDatabase from '../../config/storage';
import { Pastor, PastorDB } from "./pastor.model";

const TABLE_NAME = 'pastor';

const mapRecordToModel = (pastor: PastorDB): Pastor => ({
	id: pastor.id,
	name: pastor.name,
	picturePath: pastor.picture_path,
	hqCoordinates: JSON.parse(pastor.hq_coordinates)
})

export const getPastorById = async (id: string): Promise<Pastor | null> => {
	const database = getDatabase();
	
  const pastor = await database(TABLE_NAME).where({ id }).first();

	return pastor ? mapRecordToModel(pastor) : null
};