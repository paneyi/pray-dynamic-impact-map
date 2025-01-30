import getDatabase from '../../config/storage';
import { Engagement, EngagementDB } from "./engagement.model";

const TABLE_NAME = 'engagement';
const MAX_LIMIT = 300;

const mapRecordToModel = (engagement: EngagementDB): Engagement => ({
	id: engagement.id,
	pastorId: engagement.pastor_id,
	state: engagement.state,
	coordinates: JSON.parse(engagement.coordinates),
	timestamp: new Date(engagement.timestamp).toISOString(),
})

export const getEngagementByPastorId = async (
	pastorId: string,
	page: number | undefined = 1,
  limit: number | undefined = 50
): Promise<{ engagements: Engagement[]; limit: number, page: number; total: number; totalPages: number }> => {
	const database = getDatabase();
	
  const adjustedLimit = Math.min(limit, MAX_LIMIT);
  const offset = (page - 1) * adjustedLimit;

  // Fetch total count
  const [{ count }] = await database(TABLE_NAME)
    .where({ pastor_id: pastorId })
    .count("* as count");

  // Fetch paginated records
  const engagements = await database(TABLE_NAME)
    .where({ pastor_id: pastorId })
    .select("*")
    .limit(adjustedLimit)
    .offset(offset);

  return {
    engagements: engagements.map(mapRecordToModel),
		limit: adjustedLimit,
    page,
    total: Number(count),
    totalPages: Math.ceil(Number(count) / adjustedLimit),
  };
};